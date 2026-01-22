/**
 * Export the middleware and getCorrelationId function
 */
export {
    correlationIdMiddleware,
    getCorrelationId,
} from './correlation/middleware';


/**
 * Export the types
 */
export type {
    CorrelationIdOptions,
    RequestWithCorrelation,
} from './correlation/types';