import express, { json, Express } from "express";
import cors from "cors"

import cardRoute from "./Routers/CardsRoute"
import authenticationRoute from "./Routers/AuthenticationRoute"
import deckRoute from "./Routers/DeckRoute"

import { loadEnvironment } from "./Configs/Environment"
import { connectDb, disconnectDB } from "./Configs/Prisma";


const app = express()


app
    .use(json())
    .use(cors())
    .use("/card", cardRoute)
    .use("/auth", authenticationRoute)
    .use("/decks", deckRoute)


loadEnvironment()

export function init(): Promise<Express> {
    connectDb();
    return Promise.resolve(app);
}

export async function close(): Promise<void> {
    await disconnectDB();
}

export default app

