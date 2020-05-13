import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes";
import config from "./config";
import "./libs/database/typeorm";

import "reflect-metadata";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

if (process.env.NODE_ENV !== "prod")
  console.log(`Attention! Dev mode: ${process.env.NODE_ENV}`);

app.listen(config.port, () =>
  console.log("Server running on port:", config.port)
);
