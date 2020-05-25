const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

/** @type {import('typeorm').ConnectionOptions} */
module.exports = {
  type: "postgres",
  url: process.env.DB_URL,
  host: "localhost",
  port: 5432,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "root",
  database: process.env.DB_DATABASE || "appelections",
  synchronize: false,
  logging: false,
  migrations: ["./database/migrations/*.js"],
  entities: ["./src/models/*.ts"],
  cli: {
    entitiesDir: "entity",
    migrationsDir: "migration",
    subscribersDir: "subscriber",
  },
};
