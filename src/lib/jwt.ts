import jwt from 'jsonwebtoken';
import { User } from '@/db/schemas';

export const generateJWT = (id: User['id']): string => {
    //TODO: CHANGE JWT EXPIRES
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '365d' });
}