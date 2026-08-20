import { sendError } from '@/utils';
import type { Request, Response, NextFunction } from 'express';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    return sendError(res, 404, 'Ruta no encontrada');
};
