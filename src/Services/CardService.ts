import NotFoundError from "@/Errors/NotFoundError";
import CardRepository from "@/Repositories/CardRepository";

async function getById(id: number) {
    const card = await CardRepository.findById(id);

    if(card === null)
        throw NotFoundError
    
    return card
}

async function getAll(name: string) {

    const card = await CardRepository.findAll(name);

    if(card === null)
        throw NotFoundError
    
    return card
}



export default {
    getById,
    getAll
}