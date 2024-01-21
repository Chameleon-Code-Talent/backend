import express from "express";
import { run, closeBd, database } from "../../config/dbConnection.js";
import ServicesController from "../controller/ServicesController.js";

const route = express.Router();

route.get("/services", ServicesController.searchServices);
route.get("/services/:id", ServicesController.searchServiceById);
route.post("/services", ServicesController.registerService);
route.put("/services/:id", ServicesController.updateService);
route.delete("/services/:id", ServicesController.deleteService);

export default route;