import express from "express";
import ServicesController from "../controller/ServicesController.js";
import errorManipulation from "../middlewares/errorManipulation.js";
import verifyToken from "../middlewares/verifyToken.js";

const route = express.Router();

route.get("/services", ServicesController.searchServices);
route.get("/services/:id", ServicesController.searchServiceById);
route.post("/services", verifyToken, ServicesController.registerService);
route.put("/services/:id", verifyToken, ServicesController.updateService);
route.delete("/services/:id", verifyToken, ServicesController.deleteService);

route.use(errorManipulation);

export default route;