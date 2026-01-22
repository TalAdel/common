import jwt from 'jsonwebtoken';
import { CustomError } from '../errors/custom-error';

export interface jwtPayload {
    userId?: string;
    email?: string;
    
}

export default class JwtService{
    static generateToken(payload: jwtPayload): string {
        return jwt.sign(
            payload, 
            process.env.JWT_SECRET!, 
            { 
              expiresIn: '1h',
              algorithm: 'HS256'
            }
        );
    }

    static verifyToken(token: string): jwtPayload {
        try {
        return jwt.verify(token, process.env.JWT_SECRET!, {
                    algorithms: ['HS256']
            }) as jwtPayload;
        } catch (error) {
            throw new CustomError(401, 'invalid or expired token');
        }
    }
    
}