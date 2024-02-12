import express from "express";
import projectsRoutes from "./projectsRoutes.js";
import servicesRoutes from "./servicesRoutes.js";
import skillsRoutes from "./skillsRoutes.js";
import usersRoutes from "./usersRoutes.js";

const routes = (app) => {
    app.use(express.json(), projectsRoutes, servicesRoutes, skillsRoutes, usersRoutes)
}

export default routes;