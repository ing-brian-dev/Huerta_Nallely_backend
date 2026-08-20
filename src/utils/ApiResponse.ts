import type { Response } from 'express';

export const sendSuccess = (res: Response, data: unknown, message = 'Operación exitosa', statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

export const sendCreated = (res: Response, data: unknown, message = 'Recurso creado') => sendSuccess(res, data, message, 201);
export const sendUpdated = (res: Response, data: unknown, message = 'Recurso actualizado') => sendSuccess(res, data, message, 200);
export const sendDeleted = (res: Response, message = 'Recurso eliminado') => res.status(200).json({ success: true, message });
export const sendNoContent = (res: Response) => res.sendStatus(204);

export const sendError = (res: Response, statusCode: number, message: string, errors?: unknown) => {
    return res.status(statusCode).json({
        success: false,
        message,
        errors: errors ?? null,
    });
};
