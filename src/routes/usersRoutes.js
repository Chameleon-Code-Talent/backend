import express from "express";
import { run, closeBd, database } from "../../config/dbConnection.js";

const route = express.Router();

route.get("/", (req, res) => {
    res.send("you are on the test page users")
});

route.post("/users", async (req, res) => {
    try {
        const newUser = req.body;
        console.log(newUser)
        await run();
        const collection = database.collection("users");
        const result = await collection.insertOne(newUser);
        res.status(200).json(result);
        await closeBd();
    } catch (error) {
        res.status(500).json({ mensagem: "Erro interno do servidor", erros: error });
    }
});

export default route;