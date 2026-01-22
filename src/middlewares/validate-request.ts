import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { CustomError } from "../errors/custom-error";

export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        throw new CustomError(400, errors.array()[0].msg);
        return;
    }
    
    next();
};

export default validateRequest;