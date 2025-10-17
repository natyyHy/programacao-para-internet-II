import { NextFunction, Request, Response } from "express";
import { HTTPException } from "../exceptions/HTTPException.js";

export function global_error_middleware(
  error : any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof HTTPException) {
    const detail = error.message;
    res.status(error.status).json({ detail });
  }

  const detail = `${error.message} --> Tá tudo bem.`;
  return res.status(200).json({ detail });
}