"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Prisma_1 = require("../Configs/Prisma");
async function findByUserId(userId) {
    console.log(userId);
    const response = await Prisma_1.prisma.deck.findMany({
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
    });
    const decks = [];
    console.log(response);
    for (let deck of response) {
        let cards_game = {
            cards: [],
            games: []
        };
        for (let cards of deck.CardOnDeck) {
            cards_game.cards.push({
                name: cards.card.name,
                description: cards.card.description,
                id: cards.card.id,
                type: cards.card.type,
                img: cards.card.img
            });
            for (let card of cards.card.CardOnBooster) {
                if (!cards_game.games.includes(card.booster.Game.name))
                    cards_game.games.push(card.booster.Game.name);
            }
        }
        decks.push({
            id: deck.id,
            username: deck.User.username,
            name: deck.name,
            cards: cards_game.cards,
            games: cards_game.games
        });
    }
    return decks;
}
function findUserDeckByName(userId, name) {
    return Prisma_1.prisma.deck.findFirst({
        where: {
            userId,
            name
        }
    });
}
async function createDeck(deck) {
    const response = await Prisma_1.prisma.deck.create({
        data: {
            userId: deck.userId,
            name: deck.name,
        }
    });
    for (let card of deck.cards) {
        await Prisma_1.prisma.cardOnDeck.create({
            data: {
                cardId: card,
                deckId: response.id
            }
        });
    }
    return response;
}
exports.default = {
    findByUserId,
    findUserDeckByName,
    createDeck
};
