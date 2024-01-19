import express from "express";
import dotenv from "dotenv/config.js";
import usersRoute from "./routes/usersRoutes.js";
import projectsRoute from "./routes/projectsRoutes.js"
import createCollectionValidate from "./models/SkillsModel.js";
const app = express();

//await createCollectionValidate();

//importing routes middlewares 
app.use(express.json());
app.use(usersRoute);
app.use(projectsRoute);

export default app;