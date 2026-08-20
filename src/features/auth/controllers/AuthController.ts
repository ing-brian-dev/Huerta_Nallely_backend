import type { Request, Response } from "express"
import { authService } from "../services/AuthService"
import { sendCreated, sendSuccess } from "@/utils";

export class AuthController {

    static createUser = async (req: Request, res: Response) => {
        const user = await authService.createUser(req.body);
        return sendCreated(res, user, 'Usuario creado correctamente');
    }

    static singIn = async (req: Request, res: Response) => {

        const { token, user } = await authService.login(req.body);

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 24 * 60 * 60 * 1000, // a day
        });

        return sendSuccess(res, null, `Bienvenido al sistema: ${user}!`);
    }

    static logout = async (req: Request, res: Response) => {
        
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/"
        });

        return sendSuccess(res, null, "Sesión cerrada correctamente");
    }

    static getUser = async (req: Request, res: Response) => {
        return sendSuccess(res, req.user);
    }
}