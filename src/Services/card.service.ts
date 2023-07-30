import cardRepository from "Repositories/card.repository"




async function getCards(name?: string)
{
    const cards = await cardRepository.findCards(name)

    return cards.map(({ id, name, card }) => {
        const boosters = card.CardOnBooster.map(({ booster }) => booster);

        return {
            id,
            name,
            description: card.desc,
            img: card.img,
            boosters
        }
    });
}


export default {
    getCards
}