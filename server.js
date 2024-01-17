import express from "express";
import dotenv from "dotenv/config.js";

const app = express();
const PORT = 3000

app.listen(process.env.PORT || PORT, () => {
    console.log("Servidor escutando na porta")
});