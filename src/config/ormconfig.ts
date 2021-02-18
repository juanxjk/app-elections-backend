import "./";
import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
  type: "postgres",
  url: process.env.DB_URL,
  host: process.env.DB_HOST || "localhost",
  port: 5432,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "root",
  database: process.env.DB_DATABASE || "appelections",
  synchronize: process.env.NODE_ENV == "development" ? true : false,
  logging: false,
  migrations: ["./database/migrations/*.js"],
  entities: ["./src/models/*.ts"],
  cli: {
    entitiesDir: "entity",
    migrationsDir: "migration",
    subscribersDir: "subscriber",
  },
};

export default config;
