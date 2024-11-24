import { DataSource } from "typeorm";
import "dotenv/config";
import "reflect-metadata";

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: process.env.MONGO_URI,
  synchronize: true,
  entities: [__dirname + "/modules/**/**Entity.ts"], 
});
