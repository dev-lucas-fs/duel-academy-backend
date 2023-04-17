import CardController from "../Controllers/CardController";
import { Router } from "express";


const router = Router();
        
router.get("/", CardController.getAll)
router.get("/:card_id", CardController.getById)

export default router