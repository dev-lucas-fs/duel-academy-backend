import cardRepository from "Repositories/card.repository"




async function getCards(name?: string)
{
    const cards = await cardRepository.findCards(name)

    return cards.map(({ id, name, desc, img, CardOnBooster }) => {
        const boosters = CardOnBooster.map(({ booster }) => booster);

        return {
            id,
            name,
            description: desc,
            img: img,
            boosters
        }
    });
}


export default {
    getCards
}