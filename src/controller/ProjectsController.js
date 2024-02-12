import { run, closeBd, database } from "../../config/dbConnection.js";
import { ObjectId } from "mongodb";
const collection = database.collection("projects");
const collectionUser = database.collection("users");

class ProjectController {
    static async searchProjects(req, res, next) {
        try {
            await run();
            const result = await collection.find().toArray();
            await closeBd();
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        };
    };

    static async searchProjectById(req, res, next) {
        try {
            await run();
            const Project = new ObjectId(req.params.id);
            const result = await collection.findOne({ "_id": Project });
            await closeBd();

            //if result null
            if (!result) {
                return res.status(404).json({ message: "No projects found" });
            }

            res.status(200).json(result);
        } catch (err) {
            next(err);
        };
    };

    static async registerProject(req, res, next) {
        try {
            const newProject = req.body;
            const id_user = new ObjectId(newProject.id_user)
            await run();

            //verify project exists
            const resultProjectExists = await collection.findOne({ "title": newProject.title })
            if (resultProjectExists) {
                return res.status(400).json({ message: "The title of the project already exists, try another" })
            }

            //check if the user exists to add the new project
            const checkUserExists = await collectionUser.findOne({ "_id": id_user })
            if (!checkUserExists) {
                return res.status(404).json({ message: "'The user you are trying to add a new project to does not exist, please check the user id!" })
            }

            const result = await collection.insertOne(newProject);

            //check if the new user was created
            if (result.acknowledged == true) {
                res.status(200).json({ message: "Project inserted succesfully!" });
            }

            await closeBd();
        } catch (err) {
            next(err);
        };
    };

    static async updateProject(req, res, next) {
        try {
            const id_Project = new ObjectId(req.params.id);
            const modifiedProject = req.body;

            //check if the user is trying to change the project author (id_user)
            if ("id_user" in modifiedProject) {
                delete modifiedProject.id_user
            }

            await run();
            const result = await collection.updateOne({ "_id": id_Project }, { $set: modifiedProject });
            await closeBd();

            //check if the project has been modified
            if (result.modifiedCount == 0) {
                res.status(200).json({ mensage: "Project not modified" });
            } else {
                res.status(200).json({ mensage: "Project updated successfully" });
            }
        } catch (err) {
            next(err);
        };
    };

    static async deleteProject(req, res, next) {
        try {
            await run();
            const Project = new ObjectId(req.params.id);
            const result = await collection.deleteOne({ "_id": Project });
            await closeBd();
            if (result.deletedCount == 0) {
                res.status(200).json({ mensage: "No projects deleted!" });
            } else {
                res.status(200).json({ mensage: "Project deleted successfully" });
            }
        } catch (err) {
            next(err);
        };
    };
};

export default ProjectController;