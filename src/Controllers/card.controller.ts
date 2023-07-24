import cardService from "Services/card.service";
import { Request, Response } from "express";

interface getCardsReq extends Request {
    query: {
        name?: string
    }
}

export async function getCards(req: getCardsReq, res: Response)
{
    const { name } = req.query

    const cards = await cardService.getCards(name);

    return res.send(cards)
}