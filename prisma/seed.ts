import { loadEnvironment } from "../src/Configs/Environment";
import { connectDb, prisma } from "../src/Configs/Prisma";
// TAG FORCE 1 DATA
import boosters from "../prisma/data/tagForce1Booster";
import cards from "../prisma/data/tagForce1Cards";

loadEnvironment()
connectDb()
type Dict = { [key: number]: string };


async function main() 
{

    for(let booster of boosters)
    {
        const boosterDB = await prisma.booster.findFirst({
            where: {
                name: booster.name
            }
        })

        if(boosterDB !== null) continue;

        const save = await prisma.booster.create({
            data: {
                name: booster.name,
                unlock: booster.desc,
                img: booster.image_url
            }
        });
    }

    for(let booster of Object.keys(cards))
    {
        // @ts-ignore
        for(let card of cards[booster]) {
            const [name, rarity] = Object.keys(card)

            const boosterDb = await prisma.booster.findFirst({ where: { name: booster } })
            if(boosterDb === null) continue;

            let isCard = await prisma.card.findFirst({
                where: {
                    name
                }
            }) 
            let id = 0;
            if(isCard !== null)
                id = isCard.id;
 
            if(isCard === null) {
                const cardDb = await prisma.card.create({
                    data: {
                        name,
                        description: card[name]["desc"],
                        img: card[name]["image_url"]
                    }
                })
                id = cardDb.id
            }

            
            
            let isCardOnBooster = await prisma.cardOnBooster.findFirst({
                where: {
                    card: {
                        name,
                    },
                    booster: {
                        name: booster
                    }
                }
            })

            if(isCardOnBooster) continue;

            await prisma.cardOnBooster.create({
                data: {
                    card_id: id,
                    booster_id: boosterDb.id,
                    rarity: card[rarity]
                }
            })
        }
    }

    // EXCEPTIONS BOOSTERS

}


main()