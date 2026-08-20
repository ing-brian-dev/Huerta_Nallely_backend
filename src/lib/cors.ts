import type { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {

        const whitelist = [
            process.env.FRONTEND_URL,
        ];

        if (!origin) {
            return callback(null, true);
        }

        if (whitelist.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("CORS Error"));
    },

    credentials: true //httpOnly - cookie access_token
};