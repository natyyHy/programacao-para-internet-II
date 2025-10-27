import type { Request, Response, NextFunction } from "express";
import { HTTPException } from "../exceptions/HTTPException.js";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    if (!authorization){
        throw new HTTPException('Acesso negado. Token ausente.', 401);
    }

    if(authorization !== 'senha123'){
        throw new HTTPException('Acesso negado. Token invalido.', 403);
    }
    next();
};