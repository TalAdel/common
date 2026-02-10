import JwtService, { jwtPayload } from "../services/jwt.service";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";
import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            currentUser?: JwtPayload; 
        }
    }
}

const authenticate = async (
    req: Request, 
    _res: Response, 
    next: NextFunction
): Promise<void> => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomError(401, 'no token provided');
    }

    const token = authHeader.split(' ')[1];

    if(!token) {
        throw new CustomError(401, 'no token provided');
    }

    req.currentUser = JwtService.verifyToken(token);
    next();
};

export { authenticate as authRequest };