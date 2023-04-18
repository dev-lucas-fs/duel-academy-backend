import { validateBody } from "Middlewares/ValidationMiddleware";
import AuthenticationController from "../Controllers/AuthenticationController";
import { Router } from "express";
import { signInSchema, signUpSchema } from "Schemas/UserSchemas";


const router = Router();
        
router.post("/sign-in", validateBody(signInSchema), AuthenticationController.signIn)
router.post("/sign-up", validateBody(signUpSchema), AuthenticationController.signUp)

export default router