import AuthenticationController from "../Controllers/AuthenticationController";
import { Router } from "express";


const router = Router();
        
router.post("/sign-in", AuthenticationController.signIn)
router.post("/sign-up", AuthenticationController.signUp)

export default router