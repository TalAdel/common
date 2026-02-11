import {Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {

    if(err instanceof CustomError){
        res.status(err.statusCode).json({ message: err.message });
        return;
    }
   
    console.error(err.stack);    
    res.status(500).json({ message: err.message || 'Internal Server Error' });
};
export { errorHandler };