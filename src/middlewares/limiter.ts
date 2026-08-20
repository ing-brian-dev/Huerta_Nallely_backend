import { ApiError } from "@/utils";
import { rateLimit, RateLimitRequestHandler } from "express-rate-limit";

export const limiter = (petitionLimit: number): RateLimitRequestHandler =>
    rateLimit({
        windowMs: 60 * 1000,
        limit: petitionLimit,
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res, next) => {
            const r = req as typeof req & { rateLimit?: { resetTime?: Date } };

            const retryAfter = r.rateLimit?.resetTime
                ? Math.ceil((r.rateLimit.resetTime.getTime() - Date.now()) / 1000)
                : 60;

            return next(
                ApiError.toManyRequests(`Demasiados intentos, vuelve en ${retryAfter} segundos.`)
            );
        },
    });