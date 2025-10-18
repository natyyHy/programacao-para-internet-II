import type { Request, Response, NextFunction } from "express";
import { HTTPException } from "../exceptions/HTTPException.js";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    if (!authorization){
        const detail = 'Acesso negado. Token ausente.';
        throw new HTTPException(detail, 401);
    }

    if(authorization !== 'senha123'){
        const detail = 'Acesso negado. Token invalido.';
        throw new HTTPException(detail, 403);
    }
    next();
};