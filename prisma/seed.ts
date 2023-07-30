import { loadEnvironment } from "../src/Configs/Environment";
import { connectDb, prisma } from "../src/Configs/Prisma";
// TAG FORCE 1 DATA
import tagForceCards from "../prisma/data/tag-force.json"
import boosters from "../prisma/data/boosters.json"

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

async function loadCards()
{
    for(let card of tagForceCards["data"])
    {
        const {
            type,
            desc,
            atk,
            def,
            level,
            race,
            attribute,
            card_images,
            name: names
        } = card as Card
        const { id } = await prisma.card.create({
            data: {
                type,
                desc,
                atk,
                def,
                level,
                race,
                attribute,
                img: card_images,
                name: names[0]
            }
        })
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
            const result = await prisma.card.findFirst({
                where: {
                    name: card.Name
                }
            })
            
            if(result == null) {
                console.log("VERIFICAR PROBLEMA EM", card.Name)
                continue
            }
              
            const cardOnBooster = await prisma.cardOnBooster.findFirst({
                where: {
                    card_id: result.id,
                    booster_id: id,
                    rarity: card.Rarity
                }
            })

            if(cardOnBooster) {
                console.log(card.Name, name)
                continue
            }

            await prisma.cardOnBooster.createMany({
                data: {
                    card_id: result?.id || 0,
                    booster_id: id,
                    rarity: card.Rarity
                }
            })
        }
    }
}


async function main() 
{
    await prisma.cardOnBooster.deleteMany({})
    await prisma.booster.deleteMany({})
    await prisma.card.deleteMany({})
    await loadCards();
    await loadBoosters()
}


main()