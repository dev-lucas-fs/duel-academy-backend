import { loadEnvironment } from "../src/Configs/Environment";
import { connectDb, prisma } from "../src/Configs/Prisma";
// TAG FORCE 1 DATA
import tagForceCards from "../prisma/data/tag-force.json"
import boosters from "../prisma/data/boosters.json"
import { Type } from "@prisma/client";
import uncatalog from "../prisma/data/uncatalog.json"

loadEnvironment()
connectDb()
type Dict = { [key: number]: string };

type Card = {
    name: Array<string>
    type?: string,
    desc?: string,
    atk?: number,
    def?: number,
    level?: number,
    race?: string,
    attribute?: string,
    card_images?: string,
}

type Booster = {
    name: string,
    desc: string,
    cards: Array<{
        Name: string,
        Rarity: string
    }>
}

const DEFAULT_BOOSTER_IMG = "https://ms.yugipedia.com//thumb/c/c2/GX02-VideoGame-NA.png/257px-GX02-VideoGame-NA.png"

async function loadTypes()
{
    const types = ['Normal Monster', 'Toon Monster', 'Union Effect Monster', 'Spirit Monster', 'Flip Effect Monster', 'Effect Monster', 'Ritual Monster', 'Ritual Effect Monster', 'Fusion Monster', 'Spell Card', 'Trap Card']
    for(let type of types)
    {
        await prisma.type.create({
            data: {
                name: type
            }
        })
    }
}

async function loadCards()
{
    let typesRes = await prisma.type.findMany()
    if(!typesRes) return;

    const types: any = typesRes.reduce((prev: Dict, curr: Type) => {
        return { ...prev, ...{ [String(curr.name)]: curr.id } };
    }, {})

    for(let card of tagForceCards["data"])
    {
        const {
            desc,
            atk,
            def,
            level,
            race,
            attribute,
            card_images,
            name: names
        } = card as Card

        const type = types[card.type]

        const { id } = await prisma.card.create({
            data: {
                type_id: type || 0,
                desc,
                atk,
                def,
                level,
                race,
                attribute,
                img: card_images
            }
        })

        for(let name of names)
        {
            await prisma.cardName.create({
                data: {
                    card_id: id,
                    name
                }
            })
        }
    }
}

async function loadBoosters()
{
    for(let booster of boosters["data"])
    {
        const {
            name,
            desc,
            cards
        } = booster as Booster

        const { id } = await prisma.booster.create({
            data: {
                name,
                unlock: desc,
                img: DEFAULT_BOOSTER_IMG
            }
        })

        for(let card of cards)
        {
            const uncatalogCards = uncatalog["data"]
            if(uncatalogCards.includes(card.Name)) continue;


            const result = await prisma.cardName.findFirst({
                where: {
                    name: card.Name
                }
            })
            
            if(result == null) {
                console.log(`[${card.Name}]\n`)
                continue
            }
              
            const cardOnBooster = await prisma.cardOnBooster.findFirst({
                where: {
                    card_id: result.card_id,
                    booster_id: id,
                    rarity: card.Rarity
                }
            })

            if(cardOnBooster) {
                continue
            }

            await prisma.cardOnBooster.createMany({
                data: {
                    card_id: result.card_id,
                    booster_id: id,
                    rarity: card.Rarity
                }
            })
        }
    }
}


async function main() 
{
    await prisma.cardName.deleteMany({})
    await prisma.cardOnBooster.deleteMany({})
    await prisma.booster.deleteMany({})
    await prisma.card.deleteMany({})
    await prisma.type.deleteMany({})
    await loadTypes()
    await loadCards();
    await loadBoosters();
}


main()