import { authRepository, IAuthRepository } from "./AuthRepository";
import { checkPassword, generateJWT, hashPassword } from "@/lib";
import { ApiError } from "@/utils";
import { InsertUser } from "../types/auth.types";

class AuthService {
    constructor(
        private authRepository: IAuthRepository
    ) { }


    async createUser(data: InsertUser) {
        const existingUser = await this.authRepository.userExists(data.email);
        if (existingUser) throw ApiError.conflict('El correo ya está registrado');

        return await this.authRepository.create({
            ...data,
            password: await hashPassword(data.password),
        });
    }

    async login(credentials: InsertUser) {
        const { email, password } = credentials;

        const user = await this.authRepository.userExists(email);
        if (!user) throw ApiError.unauthorized('Correo o contraseña incorrecta');

        const validPassword = await checkPassword(password, user.password);
        if (!validPassword) throw ApiError.unauthorized('Correo o contraseña incorrecta');

        return {
            user: user.name,
            token: generateJWT(user.id)
        };
    }

    //used on autenticate middleware
    async getUser(userId: string) {
        return await this.authRepository.get(userId);
    }
}

export const authService = new AuthService(authRepository);