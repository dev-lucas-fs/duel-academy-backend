import joi from "joi"




export const signInSchema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(6),
})


export const signUpSchema = joi.object({
    username: joi.string().required().min(3),
    email: joi.string().required().email(),
    password: joi.string().required().min(6),
})