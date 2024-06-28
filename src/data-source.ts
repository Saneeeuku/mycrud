import path from "path"
import * as dotenv from 'dotenv';
import "reflect-metadata"
import { DataSource } from "typeorm"
import { Users } from "./entity/Users"

const pathToEnv = path.resolve(__dirname, '../.env')
dotenv.config({ path: pathToEnv });

export const AppDataSource = new DataSource({
    type: "postgres",
    host: `${process.env.HOST}`,
    port: Number(process.env.DB_PORT),
    username: `${process.env.USER}`,
    password: `${process.env.PASSWORD}`,
    database: `${process.env.DATABASE}`,
    synchronize: true,
    logging: false,
    entities: [Users],
    migrations: [],
    subscribers: [],
})

export const initDataSource = async () => {
    await AppDataSource.initialize()
    console.log('Database successfully connected and initialized')
}

initDataSource().catch((err) => {
    console.log("DB connection error:", err)
})
