import { run, closeBd, database } from "../../config/dbConnection.js";
import { ObjectId } from "mongodb";
const collection = database.collection("projects");

class ProjectController {
    static async searchProjects(req, res) {
        try {
            await run();
            const result = await collection.find().toArray();
            await closeBd();
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        };
    };

    static async searchProjectById(req, res) {
        try {
            await run();
            const Project = new ObjectId(req.params.id);
            const result = await collection.findOne({ "_id": Project });
            await closeBd();
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        };
    };

    static async registerProject(req, res) {
        try {
            const newProject = req.body;
            await run();
            const result = await collection.insertOne(newProject);
            res.status(200).json(result);
            await closeBd();
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        };
    };

    static async updateProject(req, res) {
        try {
            await run();
            const id_Project = new ObjectId(req.params.id);
            const result = await collection.updateOne({ "_id": id_Project }, { $set: req.body });
            await closeBd();
            res.status(200).json({ mensage: "Project updated successfully" });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        };
    };

    static async deleteProject(req, res) {
        try {
            await run();
            const Project = new ObjectId(req.params.id);
            const result = await collection.deleteOne({ "_id": Project });
            await closeBd();
            res.status(200).json({ mensage: "Project deleted successfully" });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        };
    };
};

export default ProjectController;