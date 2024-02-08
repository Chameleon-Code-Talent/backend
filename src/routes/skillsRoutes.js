import express from "express";
import { run, closeBd, database } from "../../config/dbConnection.js";
import SkillsController from "../controller/SkillsController.js";
import errorManipulation from "../middlewares/errorManipulation.js";
import verifyToken from "../middlewares/verifyToken.js";

const route = express.Router();

route.get("/skills", SkillsController.searchSkills);
route.get("/skills/:id", SkillsController.searchSkillById);
route.post("/skills", verifyToken, SkillsController.registerSkill);
route.put("/skills/:id", SkillsController.updateSkill);
route.delete("/skills/:id", SkillsController.deleteSkill);

route.use(errorManipulation);

export default route;