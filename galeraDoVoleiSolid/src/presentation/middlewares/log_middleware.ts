import { NextFunction, Request, Response } from "express";

export const log_middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`🟢 LOG: METHOD: ${req.method} PATH: ${req.path}`);
  next();
};