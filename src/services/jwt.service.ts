import jwt from 'jsonwebtoken';
import { CustomError } from '../errors/custom-error';

export interface JwtPayload {
    userId?: string;
    email?: string;
    name?: string;
    
}

export default class JwtService{
    static generateToken(payload: JwtPayload): string {
        return jwt.sign(
            payload, 
            process.env.JWT_SECRET!, 
            { 
              expiresIn: '1h',
              algorithm: 'HS256'
            }
        );
    }

    static verifyToken(token: string): JwtPayload {
        try {
        return jwt.verify(token, process.env.JWT_SECRET!, {
                    algorithms: ['HS256']
            }) as JwtPayload;
        } catch (error) {
            throw new CustomError(401, 'invalid or expired token');
        }
    }
    
}