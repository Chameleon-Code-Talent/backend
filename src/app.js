import express from "express";
import dotenv from "dotenv/config.js";
import routes from "./routes/index.js";
import errorManipulation from "./middlewares/errorManipulation.js";


const app = express();
//importing json middlewares 
app.use(express.json());
app.use(errorManipulation);
routes(app);


export default app;