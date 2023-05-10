import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import { getDataWithInterval, getHumidity } from "./services/fetch";
const express = require("express");

dotenv.config();
const PORT = process.env.PORT;
const app = express();

function serverConfig() {
  app.use(express.json());
  app.use(bodyParser);
}

export async function startServer() {
  serverConfig();
  app.listen(PORT, async () => {
    console.log(`listening to ${PORT}`);
    await getHumidity();
    await getDataWithInterval(1);
  });
}
