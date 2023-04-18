import { Errors } from "../Errors/Errors";
import CardService from "../Services/CardService";
import { NOT_FOUND, INTERNAL_SERVER_ERROR } from "http-status"
import { Request, Response } from "express";

async function getById(request: Request, response: Response) {
    try {
        const { card_id } = request.params
        const card = await CardService.getById(Number(card_id));

        return response.send(card)
    } catch(error : any) {
        if(error.name === Errors.NotFound)
            return response.sendStatus(NOT_FOUND)

        return response.sendStatus(INTERNAL_SERVER_ERROR)
    }
}

async function getAll(request: Request, response: Response) {
    try {
        const { name } = request.query
        const card = await CardService.getAll(name as string);
        
        return response.send(card)
    } catch(error: any) {
        console.log(error)
        if(error.name === Errors.NotFound)
            return response.sendStatus(NOT_FOUND)

        return response.sendStatus(INTERNAL_SERVER_ERROR)
    }
}


export default {
    getAll,
    getById
}