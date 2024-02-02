import { run, closeBd, database } from "../../config/dbConnection.js";
import { ObjectId } from "mongodb";
const collection = database.collection("skills");
const collectionUser = database.collection("users");
class SkillController {
    static async searchSkills(req, res, next) {
        try {
            await run();
            const result = await collection.find().toArray();
            await closeBd();
            res.status(200).json(result);
        } catch (err) {
            next(err);
        };
    };

    static async searchSkillById(req, res, next) {
        try {
            await run();
            const Skill = new ObjectId(req.params.id);
            const result = await collection.findOne({ "_id": Skill });
            await closeBd();

            //if result null
            if (!result) {
                return res.status(404).json({ message: "No skills found" });
            }

            res.status(200).json(result);
        } catch (err) {
            next(err);
        };
    };

    static async registerSkill(req, res, next) {
        try {
            const newSkill = req.body;
            const id_user = new ObjectId(newSkill.id_user);
            await run();

            //check if the user exists to add the new project
            const checkUserExists = await collectionUser.findOne({ "_id": id_user })
            if (!checkUserExists) {
                return res.status(404).json({ message: "'The user you are trying to add a new project to does not exist, please check the user id!" })
            }

            const result = await collection.insertOne(newSkill);

            //check if the new user was created
            if (result.acknowledged == true) {
                res.status(200).json({ message: "Skill inserted succesfully!" });
            }

            await closeBd();
        } catch (err) {
            next(err);
        };
    };

    static async updateSkill(req, res, next) {
        try {
            const id_Skill = new ObjectId(req.params.id);
            const modifiedSkill = req.body;

            //check if the user is trying to change the project author (id_user)
            if ("id_user" in modifiedSkill) {
                return res.status(400).json({ message: "It is not possible to change the skill author" });
            }

            await run();
            const result = await collection.updateOne({ "_id": id_Skill }, { $set: modifiedSkill });
            await closeBd();

            //check if the project has been modified
            if (result.modifiedCount == 0) {
                res.status(200).json({ mensage: "Skill not modified" });
            } else {
                res.status(200).json({ mensage: "Skill updated successfully" });
            }
        } catch (err) {
            next(err);
        };
    };

    static async deleteSkill(req, res, next) {
        try {
            await run();
            const Skill = new ObjectId(req.params.id);
            const result = await collection.deleteOne({ "_id": Skill });
            await closeBd();
            if (result.deletedCount == 0) {
                res.status(200).json({ mensage: "No Skills deleted!" });
            } else {
                res.status(200).json({ mensage: "Skill deleted successfully" });
            }
        } catch (err) {
            next(err);
        };
    };
};

export default SkillController;