import mysql from "mysql2";
import { relationalConnectionSchema } from "./validator";
import * as process from "process";

const env = {
  host: process.env.LOCAL_DATABASE_HOST as string,
  port: Number(process.env.LOCAL_DATABASE_PORT),
  user: process.env.LOCAL_DATABASE_USERNAME as string,
  password: process.env.LOCAL_DATABASE_PASSWORD as string,
  database: process.env.LOCAL_DATABASE_SCHEMA as string,
} satisfies mysql.ConnectionOptions;

const connectionConfig = relationalConnectionSchema.parse(env);

const connection = mysql.createConnection({
  ...connectionConfig,
});

export default connection;
