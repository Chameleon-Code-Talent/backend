import express from "express";
import { run, closeBd, database } from "../../config/dbConnection.js";
import ProjectsController from "../controller/ProjectsController.js";
import errorManipulation from "../middlewares/errorManipulation.js";

const route = express.Router();

route.get("/", (req, res) => {
    res.send("you are on the test page Project")
});

route.get("/projects", ProjectsController.searchProjects);
route.get("/projects/:id", ProjectsController.searchProjectById);
route.post("/projects", ProjectsController.registerProject);
route.put("/projects/:id", ProjectsController.updateProject);
route.delete("/projects/:id", ProjectsController.deleteProject);

//usar middleware de erro
route.use(errorManipulation);

export default route;