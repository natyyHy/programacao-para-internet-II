import { NextFunction, Request, Response } from "express";
import { DomainException } from "../../application/exceptions/domainException.js";
import { NotFoundException } from "../../application/exceptions/notFoundExcepion.js";
import { HTTPException } from "../exceptions/HTTPException.js";


export function translate_exception_middleware(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    //so processa se for excep dominio
    if(error instanceof DomainException){
        if(error instanceof NotFoundException){
            const httpException = new HTTPException(error.message, 404);
            return next(httpException);
        }
    }
    //se nao for, passa adiante
    next(error);
}