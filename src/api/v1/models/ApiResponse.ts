/**
 * Generic success response structure
 */
export interface SuccessResponse<T> {
    success: true;
    message: string;
    data: T;
}

/**
 * Error response structure
 */
export interface ErrorResponse {
    success: false;
    message: string;
    errors?: Array<{
        field: string;
        message: string;
    }>;
}

/**
 * Union type for all API responses
 */
export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

/**
 * Helper function to create success responses
 */
export function createSuccessResponse<T>(
    message: string,
    data: T
): SuccessResponse<T> {
    return {
        success: true,
        message,
        data,
    };
}

/**
 * Helper function to create error responses
 */
export function createErrorResponse(
    message: string,
    errors?: Array<{ field: string; message: string }>
): ErrorResponse {
    return {
        success: false,
        message,
        errors,
    };
}