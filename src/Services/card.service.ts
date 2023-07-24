import cardRepository from "Repositories/card.repository"




async function getCards(name?: string)
{
    const cards = await cardRepository.findCards(name)

    return cards.map(({ id, name, description, img, CardOnBooster }) => {
        const boosters = CardOnBooster.map(({ booster }) => booster);

        return {
            id,
            name,
            description,
            img,
            boosters
        }
    });
}


export default {
    getCards
}