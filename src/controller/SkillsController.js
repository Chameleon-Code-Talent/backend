import { run, closeBd, database } from "../../config/dbConnection.js";
import { ObjectId } from "mongodb";
const collection = database.collection("skills");

class SkillController {
    static async searchSkills(req, res) {
        try {
            await run();
            const result = await collection.find().toArray();
            await closeBd();
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        };
    };

    static async searchSkillById(req, res) {
        try {
            await run();
            const Skill = new ObjectId(req.params.id);
            const result = await collection.findOne({ "_id": Skill });
            await closeBd();
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        };
    };

    static async registerSkill(req, res) {
        try {
            const newSkill = req.body;
            await run();
            const result = await collection.insertOne(newSkill);
            res.status(200).json(result);
            await closeBd();
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        };
    };

    static async updateSkill(req, res) {
        try {
            await run();
            const id_Skill = new ObjectId(req.params.id);
            const result = await collection.updateOne({ "_id": id_Skill }, { $set: req.body });
            await closeBd();
            res.status(200).json({ mensage: "Skill updated successfully" });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        };
    };

    static async deleteSkill(req, res) {
        try {
            await run();
            const Skill = new ObjectId(req.params.id);
            const result = await collection.deleteOne({ "_id": Skill });
            await closeBd();
            res.status(200).json({ mensage: "Skill deleted successfully" });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        };
    };
};

export default SkillController;