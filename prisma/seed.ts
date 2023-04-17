import { loadEnvironment } from "../src/Configs/Environment";
import { connectDb, prisma } from "../src/Configs/Prisma";
import tagForce1Data from "./../yu-gi-oh!-cards-webscrapping/tag-force-1.data";

loadEnvironment()
connectDb()

async function main() {
    await prisma.cardOnDeck.deleteMany({})
    await prisma.deck.deleteMany({})
    await prisma.user.deleteMany({})
    await prisma.cardOnBooster.deleteMany({})
    await prisma.booster.deleteMany({})
    await prisma.card.deleteMany({})
    await prisma.tagForceGame.deleteMany({})
    
    const { id } = await prisma.tagForceGame.create({ data: { name: "Tag Force 1" }})
      
    for(let booster of tagForce1Data) {
        const { id: booster_id } = await prisma.booster.create({
            data: {
                name: booster.name,
                unlock: booster.unlock,
                gameId: id
            }
        })

        if(booster.cards["Ultra Rare"] !== undefined) {
            for(let i = 0; i < booster.cards["Ultra Rare"].length; i++) {
                const { id } = await prisma.card.create({
                    data: {
                        name: booster.cards["Ultra Rare"][i].name,
                        img: booster.cards["Ultra Rare"][i].image as string,
                        type: booster.cards["Ultra Rare"][i].type,
                        description: booster.cards["Ultra Rare"][i].description
                    }
                })
                await prisma.cardOnBooster.create({
                    data: {
                        card_id: id,
                        booster_id
                    }
                })
            }                   
        }
        
        if(booster.cards["Super Rare"] !== undefined) {
            for(let i = 0; i < booster.cards["Super Rare"].length; i++) {
                const { id } = await prisma.card.create({
                    data: {
                        name: booster.cards["Super Rare"][i].name,
                        img: booster.cards["Super Rare"][i].image as string,
                        type: booster.cards["Super Rare"][i].type,
                        description: booster.cards["Super Rare"][i].description
                    }
                })
                await prisma.cardOnBooster.create({
                    data: {
                        card_id: id,
                        booster_id
                    }
                })
            }      
        }

        if(booster.cards["Rare"] !== undefined) {
            for(let i = 0; i < booster.cards["Rare"].length; i++) {
                const { id } = await prisma.card.create({
                    data: {
                        name: booster.cards["Rare"][i].name,
                        img: booster.cards["Rare"][i].image as string,
                        type: booster.cards["Rare"][i].type,
                        description: booster.cards["Rare"][i].description
                    }
                })
                await prisma.cardOnBooster.create({
                    data: {
                        card_id: id,
                        booster_id
                    }
                })
            }      
        }

        if(booster.cards["Common"] !== undefined) {
            for(let i = 0; i < booster.cards["Common"].length; i++) {
                const { id } = await prisma.card.create({
                    data: {
                        name: booster.cards["Common"][i].name,
                        img: booster.cards["Common"][i].image as string,
                        type: booster.cards["Common"][i].type,
                        description: booster.cards["Common"][i].description
                    }
                })
                await prisma.cardOnBooster.create({
                    data: {
                        card_id: id,
                        booster_id
                    }
                })
            }      
        }        
    }

}


main()