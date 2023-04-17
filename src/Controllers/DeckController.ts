// @ts-nocheck

import { Errors } from "../Errors/Errors";
import { AuthenticatedRequest } from "../Middlewares/AuthenticationMiddleware";
import DeckService from "../Services/DeckService";
import { Response } from "express";
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "http-status";


async function getAllUserDecks(request: Request, response: Response) {
    try {
        const { userId } = request
        const card = await DeckService.getDecksByUserId(userId);

        return response.send(card)
    } catch(error: any) {
        console.log(error)
        if(error.name === Errors.NotFound)
            return response.sendStatus(NOT_FOUND)

        return response.sendStatus(INTERNAL_SERVER_ERROR)
    }
}

async function postDeck(request: Request, response: Response) {
    try {
        const { userId } = request
        const { cards, name } = request.body
        console.log(cards, name)
        const card = await DeckService.saveDeck({ userId, cards, name });

        return response.send(card)
    } catch(error: any) {
        console.log(error)
        if(error.name === Errors.NotFound)
            return response.sendStatus(NOT_FOUND)

        return response.sendStatus(INTERNAL_SERVER_ERROR)
    }
}

export default {
    getAllUserDecks,
    postDeck
}