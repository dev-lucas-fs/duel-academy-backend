// @ts-nocheck
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";

import unauthorizedError from "../Errors/NotFoundError";
import { prisma } from "../Configs/Prisma";

export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader) return generateUnauthorizedResponse(res);
    
        const token = authHeader.split(" ")[1];
        if (!token) return generateUnauthorizedResponse(res);
    
        const { userId } = jwt.verify(token, process.env.JWT_SECRET ?? "segredo") as JWTPayload;
        const user = await prisma.user.findFirst({ where: { id: userId } })
        if(user === null)
            return generateUnauthorizedResponse(res)
        
        console.log(userId)
        req.userId = user.id;
    } catch(err) {
        console.log(err)
    } 
    return next();
}

function generateUnauthorizedResponse(res: Response) {
  res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError);
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
  userId: number;
};