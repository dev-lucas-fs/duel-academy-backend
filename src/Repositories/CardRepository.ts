import { prisma } from "@/Configs/Prisma";
import NotFoundError from "@/Errors/NotFoundError";


function findAll(name: string) {
    return prisma.card.findMany({
        where: {
            name: {
                contains: name,
            }
        },
        take: 10
    })
}

async function findById(id: number) {

    const card = await prisma.card.findFirst({ 
        where: { 
            id 
        },
        include: {
            CardOnBooster: true
        } 
    }) 
    
    if(card === null)
        throw NotFoundError

    const { CardOnBooster, id: cardId, description, type, img, name } = card

    let boosters = []
    for(let boosterId of CardOnBooster.map(({ booster_id }) => booster_id )) {
        const booster = await prisma.booster.findFirst({ where: { id: boosterId } })
        boosters.push(booster)
    }

    return {
        cardId, 
        description, 
        type, 
        img, 
        name,
        boosters
    }
}


export default {
    findAll,
    findById
}