import express from "express";
import dotenv from "dotenv/config.js";
import usersRoute from "./routes/usersRoutes.js";
import projectsRoute from "./routes/projectsRoutes.js"
import skillsRoute from "./routes/skillsRoutes.js";
import servicesRoute from "./routes/servicesRoute.js";
const app = express();

//await createCollectionValidate();

//importing routes middlewares 
app.use(express.json());
app.use(usersRoute);
app.use(projectsRoute);
app.use(skillsRoute);
app.use(servicesRoute);

export default app;