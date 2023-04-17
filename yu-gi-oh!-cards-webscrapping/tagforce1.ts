import axios from 'axios'
import * as cheerio from "cheerio"
import fs from "fs"

const BASE_URL = "https://yugioh.fandom.com"
const BOOSTERS_URL = `${BASE_URL}/Yu-Gi-Oh!_GX_Tag_Force:_Booster_Packs`
const YUGIOH_API_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php?name="
const RARITIES = ["Ultra Rare", "Super Rare", "Rare", "Common"]

async function getBoosterList() {
    const { data: HTML } = await axios.get(BOOSTERS_URL)
    const $ = cheerio.load(HTML)

    const boosters : Array<any> = []
    $("#mw-content-text > div ul li").each((i, el) => {
        if(i >= 48) return

        let [name, unlock] = $(el).text().trim().split(": ")

        let url = ""
        cheerio.load(el)("a").each((i, el) => {
            if(i === 0)
                url = $(el).attr("href") as string
        })

        url = `${BASE_URL}${url}`
        boosters.push({ name, unlock, url, cards: {} })
    })

    return boosters
}


function formatHTMLtoCardListStr(text: string) {
    let cards = [""], rows = text.split("\n")

    for(let row of rows) {
        if(row === "Ultra Rare")
            cards.push(row)
        
        if(row === "ve")
            break

        if(cards.length > 1 && row !== "" && row !== "Ultra Rare")
            cards.push(row)     
    }

    return cards.slice(1).join("\n")    
}

function strToCardListObj(str: string) {
    let lastRarity = "", cards : any = {}
    
    for(let row of str.split('\n')) {
        if(RARITIES.includes(row)) {
            lastRarity = row
            continue
        }
                
        if(cards[lastRarity] === undefined)
            cards[lastRarity] = []

        cards[lastRarity].push({
            name: row.trim()
        })
    }

    return cards
}

function formatCardNameToYUGIOHAPI(name: string) {
    return name.trim().replace(" ", "%20")
}

async function getCardInfo(name: string) {
    const { data: obj } = await axios.get(`${YUGIOH_API_URL}${formatCardNameToYUGIOHAPI(name)}`)
    const { data } = obj

    const info : { [key: string]: Array<any> } = {}
    info.image = data[0].card_images[0]["image_url"]
    info.type = data[0].type
    info.description = data[0].desc

    return info
}

async function getBoosterPacksCards(url: string) {
    const { data } = await axios.get(url)

    const $ = cheerio.load(data)
    let cards : { [key: string]: Array<any> } = {}
    $("#mw-content-text .mw-parser-output").each((i, el) => {
        const rows = $(el).text().trim()
        cards = strToCardListObj(formatHTMLtoCardListStr(rows))
    })

    for(let key of RARITIES) 
        for(let i = 0; i < cards[key].length; i++) {
            const { image, type, description } = await getCardInfo(cards[key][i].name)
            cards[key][i] = {...cards[key][i], ...{image, type, description}}   
        }
    
    console.log(cards)

    return cards
}

export async function getTagForce1Data() {
    const boosters = await getBoosterList()
    for(let booster of boosters.slice(0, 1))
        booster.cards = await getBoosterPacksCards(`${booster.url}`)

    fs.writeFileSync("./yu-gi-oh!-cards-webscrapping/tag-force-1.data.ts", `
        export default ${JSON.stringify(boosters)}
    `)
}

