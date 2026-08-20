import { ApiError, sendError } from '@/utils';
import type { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'sequelize';


export const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ApiError) {
        return sendError(res, error.statusCode, error.message, error.errors);
    }

    if (error instanceof ValidationError) {
        return sendError(res, 400, error.message, error.errors.map(err => ({
            message: err.message,
            field: err.path,
            validatorKey: 'validatorKey' in err ? err.validatorKey : undefined,
        })));
    }

    if (error instanceof Error && 'errors' in error && Array.isArray((error as any).errors)) {
        const err = error as any;
        return sendError(res, 400, err.message, err.errors.map((validationError: any) => ({
            message: validationError.message,
            field: validationError.path,
            validatorKey: validationError.validatorKey,
        })));
    }

    const message = error instanceof Error ? error.message : 'Error desconocido';
    return sendError(res, 500, 'Error interno del servidor', { message });
};
