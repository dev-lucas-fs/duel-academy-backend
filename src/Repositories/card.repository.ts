import { prisma } from "Configs/Prisma"




function findCards(name?: string)
{
    return prisma.cardName.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: name || "Roid",
                        mode: "insensitive"
                    }
                },
                {
                    card: {
                        desc: {
                            contains: name,
                            mode: "insensitive"
                        }
                    }
                },
            ]
            
        },
        orderBy: [
            {
                card: {
                    type_id: 'asc',
                }
            }
        ],
        distinct: ["card_id"],
        select: {
            id: true,
            name: true,
            card: {
                select: {
                    img: true,
                    desc: true,
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
                }
            }
            
        },
        take: 50
    })    
}


export default {
    findCards
}