import * as typeorm from "typeorm";
import express, { Express } from "express";
import { Server } from "http";
import cors from "cors";
import bodyParser from "body-parser";

import config from "./config";

import routes from "./routes";

const isDevMode = process.env.NODE_ENV === "development";

class App {
  public expressApp: Express = express();
  public expressServer?: Server;
  public dbConnection?: typeorm.Connection;

  async start() {
    console.log("Server is starting...");

    try {
      await this.startHttpServer();
      this.setupMiddlewares();
      await this.startDatabase();
    } catch (err) {
      if (isDevMode) console.error(err);
    }
  }

  async close() {
    this.closeHttpServer();
    this.closeDatabase();
  }

  async startHttpServer() {
    try {
      if (!this.expressServer || !this.expressServer.listening)
        this.expressServer = this.expressApp.listen(config.port, () =>
          console.log("Server running on port:", config.port)
        );
    } catch (err) {
      console.error("App: http server error.");
      if (isDevMode) console.error(err);
    }
  }

  async startDatabase() {
    try {
      if (!this.dbConnection) {
        this.dbConnection = await typeorm.createConnection();
        if (isDevMode) console.log("Database is connected.");

        if (isDevMode)
          console.log(`Database name: ${this.dbConnection.options.database}.`);

        if (isDevMode)
          console.log(
            `Database Sync mode: ${this.dbConnection.options.synchronize}.`
          );
      }
    } catch (error) {
      console.error("App: database connection error.");
      if (isDevMode) console.log(error);
    }
  }

  setupMiddlewares() {
    if (this.expressApp) {
      this.expressApp.use(cors());
      this.expressApp.use(bodyParser.json());
      this.expressApp.use(routes);
    }
  }

  closeDatabase() {
    if (this.dbConnection) this.dbConnection.close();
  }
  closeHttpServer() {
    if (this.expressServer) this.expressServer.close();
  }
}

export default new App();
