import express, { json, Express } from "express";
import cors from "cors"

import Environment from "./Configs/Environment"
import { connectDb, disconnectDB } from "./Configs/Prisma";


const app = express()

app.use(json())
app.use(cors())


const env = new Environment()


export function init(): Promise<Express> {
    connectDb();
    return Promise.resolve(app);
}

export async function close(): Promise<void> {
    await disconnectDB();
}

export default app

