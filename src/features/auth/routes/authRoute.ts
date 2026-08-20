import { Router } from "express";
import { body } from "express-validator";
import { limiter, validateRequest, authenticate } from "@/middlewares";
import { AuthController } from "../controllers/AuthController";

export const authRouter = Router();

authRouter.post('/create',
    limiter(5),
    body('name').notEmpty().withMessage('El nombre es requerido.'),
    body('email').notEmpty().withMessage('El correo es requerido.'),
    body('password').notEmpty().withMessage('La contraseña es requerida.'),
    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) throw new Error('Las contraseñas no son iguales.');
            return true;
        }),
    validateRequest,
    AuthController.createUser
);

authRouter.post('/login',
    limiter(5),
    body('email').notEmpty().withMessage('El correo es requerido.'),
    body('password').notEmpty().withMessage('La contraseña es requerida.'),
    validateRequest,
    AuthController.singIn
);

authRouter.post('/logout',
    AuthController.logout
);

authRouter.get('/user', authenticate, AuthController.getUser);