import { NextFunction, Request, Response } from "express";
import { HTTPException } from "../exceptions/HTTPException.js";
import { ZodError } from "zod";

export function global_error_middleware(
  error : any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof HTTPException) {
    return res.status(error.status).json({ erro: error.message });
  }

  if(error instanceof ZodError){
    return res.status(400).json({erro: "Dados de entrada invalidos"});
  }

}