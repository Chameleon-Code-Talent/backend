import express from "express";
import { run, closeBd, database } from "../../config/dbConnection.js";
import SkillsController from "../controller/SkillsController.js";

const route = express.Router();

route.get("/skills", SkillsController.searchSkills);
route.get("/skills/:id", SkillsController.searchSkillById);
route.post("/skills", SkillsController.registerSkill);
route.put("/skills/:id", SkillsController.updateSkill);
route.delete("/skills/:id", SkillsController.deleteSkill);

export default route;