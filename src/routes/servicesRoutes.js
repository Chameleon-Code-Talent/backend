import express from "express";
import ServicesController from "../controller/ServicesController.js";
import errorManipulation from "../middlewares/errorManipulation.js";

const route = express.Router();

route.get("/services", ServicesController.searchServices);
route.get("/services/:id", ServicesController.searchServiceById);
route.post("/services", ServicesController.registerService);
route.put("/services/:id", ServicesController.updateService);
route.delete("/services/:id", ServicesController.deleteService);

route.use(errorManipulation);

export default route;