// @ts-nocheck
import DeckController from "../Controllers/DeckController";
import { authenticateToken } from "../Middlewares/AuthenticationMiddleware";
import { Router } from "express";


const router = Router();
        
router.get("/", authenticateToken, DeckController.getAllUserDecks)
router.post("/", authenticateToken, DeckController.postDeck)

export default router