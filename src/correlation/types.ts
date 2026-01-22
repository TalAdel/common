import { Request } from "express";

export interface CorrelationIdOptions{
    
    /**
     * Header name to use for correlation ID
     * @default 'x-correlation-id'
     */

    headerName?: string;

    /**
     * send the correlation ID back to client in the response headers
     * Whether to echo the correlation ID back in response headers
     * @default true
     */
    echoHeader?: boolean;

    /**
     * Custom function to generate correlation IDs (som)
     * If not provided, UUID v4 WILL BE USED
     */
    
    generator?: () => string;
}

export interface RequestWithCorrelation extends Request{
/**
 * its not a default property ,this extends the request type 
 * its a function becouse its matches the pattern from cls-rtracer library
 * Get the correlation ID for the current request
 */
    correlationId: ()=> string | undefined; 
}