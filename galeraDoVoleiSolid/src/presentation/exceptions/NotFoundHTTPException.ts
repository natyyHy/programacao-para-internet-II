import { HTTPException } from "./HTTPException.js";

export class NotFoundHTTPException extends HTTPException{
    constructor(message: string) {
        super(message, 404);
    }
}