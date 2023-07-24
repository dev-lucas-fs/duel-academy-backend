import { Router } from "express";
import { getCards } from "Controllers/card.controller"

const cardRouter = Router();

cardRouter.get("", getCards);


export default cardRouter