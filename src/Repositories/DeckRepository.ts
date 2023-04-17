import { prisma } from "../Configs/Prisma"

async function findByUserId(userId: number) {
    const response = await prisma.deck.findMany({
        where: {
            userId
        },
        orderBy: [
            {
                id: "desc"
            }
        ],
        include: {
            CardOnDeck: {
                select: {
                    card: {
                        include: {
                            CardOnBooster: {
                                select: {
                                    booster: {
                                        select: {
                                            Game: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                }
            },
            User: true
        }
    })

    const decks: any = []
    for(let deck of response) {
        let cards_game: { cards: Array<any>, games: Array<any> } = {
            cards: [],
            games: []
        }
        for(let cards of deck.CardOnDeck) {
            cards_game.cards.push({
                name: cards.card.name,
                description: cards.card.description,
                id: cards.card.id,
                type: cards.card.type,
                img: cards.card.img
            })
            for(let card of cards.card.CardOnBooster) {
                if(!cards_game.games.includes(card.booster.Game.name))
                    cards_game.games.push(card.booster.Game.name)
            }
        }
        decks.push({
            id: deck.id,
            username: deck.User.username,
            name: deck.name,
            cards: cards_game.cards,
            games: cards_game.games
        })
    }

    return decks
}

function findUserDeckByName(userId: number, name: string) {
    return prisma.deck.findFirst({
        where: {
            userId,
            name
        }
    })
}


async function createDeck(deck: { userId: number, cards: Array<number>, name: string}) {
    const response = await prisma.deck.create({
        data: {
            userId: deck.userId,
            name: deck.name,
        }
    })

    for(let card of deck.cards) {
        await prisma.cardOnDeck.create({
            data: {
                cardId: card,
                deckId: response.id
            }
        })
    }
    return response
}

export default {
    findByUserId,
    findUserDeckByName,
    createDeck
}