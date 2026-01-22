import { randomUUID } from 'crypto';
import {Request, Response, NextFunction} from 'express';
import * as rTracer from 'cls-rtracer';
import { CorrelationIdOptions, RequestWithCorrelation } from './types';

const DEFAULT_HEADER_NAME = 'x-correlation-id';

export function correlationIdMiddleware(options: CorrelationIdOptions = {}){
    const {
        headerName = DEFAULT_HEADER_NAME,
        echoHeader = true,
        generator = randomUUID,
    } = options;

    const rTracerMiddleware = rTracer.expressMiddleware({
        useHeader: true,
        headerName: headerName,
        echoHeader: echoHeader,
        requestIdFactory: generator,
    });

    return (req: Request, res: Response, next: NextFunction) => {
        rTracerMiddleware(req, res, () => {
            (req as RequestWithCorrelation).correlationId = () => rTracer.id() as string | undefined;

            next();
        });
    };
}

export function getCorrelationId(): string | undefined {
    return rTracer.id() as string | undefined;
}