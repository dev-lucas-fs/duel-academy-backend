import { prisma } from "Configs/Prisma"




function findCards(name?: string)
{
    return prisma.card.findMany({
        where: {
            name: {
                contains: name,
                mode: "insensitive"
            },
            description: {
                contains: name,
                mode: "insensitive"
            }
        },
        select: {
            id: true,
            name: true,
            description: true,
            img: true,
            CardOnBooster: {
                select: {
                    booster: {
                        select: {
                            id: true,
                            name: true,
                            img: true,
                            unlock: true
                        }
                    }
                }
            }
        },
        take: 100
    })    
}


export default {
    findCards
}