import express from "express";
import dotenv from "dotenv/config.js";
import { run, closeBd } from "./config/dbConnection.js";

const app = express();
const PORT = 3000

app.listen(process.env.PORT || PORT, () => {
    console.log("Server listening");
});