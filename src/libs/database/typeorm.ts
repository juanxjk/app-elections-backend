import * as typeorm from "typeorm";

let connection: typeorm.Connection;

export const getConnection = async (): Promise<typeorm.Connection> => {
  if (!connection) {
    try {
      connection = await typeorm.createConnection();
      console.log("[INFO]: Database is connected.");
      console.log(`[INFO]: Database name: ${connection.options.database}.`);
      console.log(
        `[INFO]: Database Sync mode: ${connection.options.synchronize}.`
      );
    } catch (error) {
      console.error("[ERROR]: Database connection error!");
      if (process.env.NODE_ENV === "development") console.log(error);
    }
  }
  return connection;
};

getConnection();
