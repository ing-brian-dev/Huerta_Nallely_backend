import { ApiError } from '@/utils';
import type { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Datos de entrada inválidos', errors.array()));
    }

    return next();
};
