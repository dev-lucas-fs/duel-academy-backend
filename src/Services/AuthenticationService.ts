import { SignInType, SignUpType } from "../Controllers/AuthenticationController";
import NotFoundError from "../Errors/NotFoundError";
import AuthenticationRepository from "../Repositories/AuthenticationRepository";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { User } from "@prisma/client";

function createToken({ id, email }: { id: number, email: string }) {
    const token = jwt.sign({
        id,
        email
    }, process.env.JWT_SECRET ?? "segredo")
    return token
}

async function signIn({ email, password }: SignInType) {
    const user = await AuthenticationRepository.signIn(email)
    console.log(user)
    if(user === null)
        throw NotFoundError

    const isPassword = await bcrypt.compare(password, user.password)
    if(!isPassword)
        throw NotFoundError

    const token = createToken({ email, id: user.id })

    return token
}

async function signUp({ username, email, password }: SignUpType) {
    let user = await AuthenticationRepository.signIn(email)
    if(user?.username.toLowerCase() === username.toLowerCase())
        throw NotFoundError

    if(user !== null)
        throw NotFoundError

    const encrpyted = await bcrypt.hash(password, 10)
    const response = await AuthenticationRepository.signUp({ username, email, password: encrpyted })

    return response
}


export default {
    signIn,
    signUp
}







