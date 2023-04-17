import NotFoundError from "../Errors/NotFoundError";
import CardRepository from "../Repositories/CardRepository";
import DeckRepository from "../Repositories/DeckRepository";

async function saveDeck(deck: { userId: number, cards: Array<number>, name: string}) {
    const response = await DeckRepository.findUserDeckByName(deck.userId, deck.name)
    if(response !== null)
        throw NotFoundError

    for(let card of deck.cards) {
        const response = await CardRepository.findById(Number(card))
        if(response === null)
            throw NotFoundError
    }

    return await DeckRepository.createDeck(deck)
}

async function getDecksByUserId(id: number) {
    const decks = await DeckRepository.findByUserId(id)

    if(decks === null)
        throw NotFoundError

    return decks
}


export default {
    saveDeck,
    getDecksByUserId
}