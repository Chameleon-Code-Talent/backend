import express from "express";
import dotenv from "dotenv/config.js";
import routes from "./routes/index.js";


const app = express();
//importing json middlewares 
app.use(express.json());
routes(app);


export default app;