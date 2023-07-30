import { prisma } from "Configs/Prisma"




function findCards(name?: string)
{
    return prisma.card.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: name || "Roid",
                        mode: "insensitive"
                    }
                },
                {
                    desc: {
                        contains: name,
                        mode: "insensitive"
                    }
                },
            ]
            
        },
        orderBy: [
            {
                type_id: 'asc'
            }
        ],
        select: {
            id: true,
            name: true,
            desc: true,
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
        take: 50
    })    
}


export default {
    findCards
}