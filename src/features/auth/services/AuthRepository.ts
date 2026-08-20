import { User } from "@/db/schemas";
import { InsertUser, SelectUser } from "../types/auth.types";

export interface IAuthRepository {
    create(data: InsertUser): Promise<SelectUser>;
    userExists(email: string): Promise<SelectUser | null>;
    get(userId: string): Promise<SelectUser | null>;
}

class AuthRepository implements IAuthRepository {
    
    async create(data: InsertUser) {
        return await User.create(data);
    }

    async userExists(email: string) {
        return await User.findOne({
            where: { email },
            attributes: ['id', 'name', 'email', 'password']
        });
    }

    //used on autenticate middleware
    async get(userId: string) {
        return await User.findByPk(userId, {
            attributes: ['id', 'name', 'email']
        });
    }
}

export const authRepository = new AuthRepository();