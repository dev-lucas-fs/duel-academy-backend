import express, { json, Express } from "express";
import cors from "cors"


import { loadEnvironment } from "./Configs/Environment"
import { connectDb, disconnectDB } from "./Configs/Prisma";
import cardRouter from "Routers/card.route";


const app = express()


app
    .use(json())
    .use(cors())
    .use("/cards", cardRouter)


loadEnvironment()

export function init(): Promise<Express> {
    connectDb();
    return Promise.resolve(app);
}

export async function close(): Promise<void> {
    await disconnectDB();
}

export default app

