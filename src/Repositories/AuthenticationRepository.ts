import { prisma } from "@/Configs/Prisma"
import { SignInType, SignUpType } from "@/Controllers/AuthenticationController"




function signIn(email: string) {
    return prisma.user.findFirst({
        where: { email }
    })
}


function signUp({ username, email, password }: SignUpType) {
    return prisma.user.create({
        data: { username, email, password }
    })
}

export default {
    signIn,
    signUp
}