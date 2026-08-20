import type { Request, Response, NextFunction } from "express";
import { authService } from "@/features/auth/services/AuthService";
import { User } from "@/db/schemas";
import { ApiError } from "@/utils";
import jwt from 'jsonwebtoken';
import { parseCookie } from "cookie";

declare global {
    namespace Express {
        interface Request {
            user?: Pick<User, 'id' | 'name' | 'email'>;
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const cookies = parseCookie(req.headers.cookie ?? "");

    const token = cookies.access_token;

    if (!token) {
        return next(ApiError.unauthorized("Token no proporcionado"));
    }

    if (!process.env.JWT_SECRET) {
        return next(new Error('JWT_SECRET is not defined in environment variables'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;

        if (!decoded || typeof decoded !== 'object' || !decoded.id) {
            return next(ApiError.unauthorized('Token inválido'));
        }

        const user = await authService.getUser(decoded.id);

        if (!user) {
            return next(ApiError.unauthorized('Usuario no encontrado'));
        }

        req.user = user;
        return next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return next(ApiError.unauthorized('Token expirado'));
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return next(ApiError.unauthorized('Token inválido'));
        }
        return next(error instanceof Error ? error : new Error('Error de autenticación'));
    }
};