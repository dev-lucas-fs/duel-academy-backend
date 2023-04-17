import AuthenticationService from "@/Services/AuthenticationService";
import { Request, Response } from "express";

export type SignInType = {
    email: string,
    password: string
}

export type SignUpType = {
    username: string,
    email: string,
    password: string
}

async function signIn(request: Request, response: Response) {
    try {
        const { email, password } = request.body as SignInType
        const token = await AuthenticationService.signIn({ email, password })

        return response.send({ token })
    } catch(err: any) {
        return response.sendStatus(404)
    }
}


async function signUp(request: Request, response: Response) {
    try {
        const { username, email, password } = request.body as SignUpType
        await AuthenticationService.signUp({ username, email, password })

        return response.sendStatus(201)
    } catch(err) {
        console.log(err)
        return response.sendStatus(404)
    }
}



export default {
    signIn,
    signUp
}


