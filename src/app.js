import express from "express";
import dotenv from "dotenv/config.js";
import routes from "./routes/index.js";
import errorManipulation from "./middlewares/errorManipulation.js";
import manipulator404 from "./middlewares/manipulator404.js";

const app = express();
//importing json middlewares 
app.use(express.json());

routes(app);

app.use(errorManipulation);
app.use(manipulator404);

export default app;