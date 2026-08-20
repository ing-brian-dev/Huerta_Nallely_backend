import { Sequelize, type SequelizeOptions } from "sequelize-typescript";
import colors from 'colors';
import dotenv from 'dotenv';
dotenv.config();

export const db = new Sequelize({
  database: process.env.DB_DATABASE,
  dialect: process.env.DB_CONNECTION as SequelizeOptions["dialect"],
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  logging: false,
  models: [__dirname + '/schemas/!(index).ts'],
});

export async function connectDB() {
    try {
        await db.authenticate();
        await db.sync();
        console.log(colors.yellow.bold('Database connected successfully...'));
    } catch (error) {
        console.log(colors.red.bold('Database conection failed...'));
    }
}