import { run, closeBd, database } from "../../config/dbConnection.js";
import { ObjectId } from "mongodb";
const collection = database.collection("services");
const collectionUser = database.collection("users");
class ServiceController {
    static async searchServices(req, res) {
        try {
            await run();
            const result = await collection.find().toArray();
            await closeBd();
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        };
    };

    static async searchServiceById(req, res, next) {
        try {
            await run();
            const Service = new ObjectId(req.params.id);
            const result = await collection.findOne({ "_id": Service });
            await closeBd();

            //if result null
            if (!result) {
                return res.status(404).json({ message: "No services found" });
            }

            res.status(200).json(result);
        } catch (err) {
            next(err);
        };
    };

    static async registerService(req, res, next) {
        try {
            const newService = req.body;
            const id_user = new ObjectId(newService.id_user);
            await run();

            //check if the user exists to add the new project
            const checkUserExists = await collectionUser.findOne({ "_id": id_user })
            if (!checkUserExists) {
                return res.status(404).json({ message: "'The user you are trying to add a new project to does not exist, please check the user id!" })
            }

            const result = await collection.insertOne(newService);

            //check if the new user was created
            if (result.acknowledged == true) {
                res.status(200).json({ message: "Project inserted succesfully!" });
            }

            await closeBd();
        } catch (err) {
            next(err);
        }
    };

    static async updateService(req, res) {
        try {
            const id_Service = new ObjectId(req.params.id);
            const modifiedService = req.body;

            //check if the user is trying to change the project author (id_user)
            if ("id_user" in modifiedService) {
                return res.status(400).json({ message: "It is not possible to change the project author" });
            }

            await run();
            const result = await collection.updateOne({ "_id": id_Service }, { $set: modifiedService });
            await closeBd();

            //check if the project has been modified
            if (result.modifiedCount == 0) {
                res.status(200).json({ mensage: "Service not modified" });
            } else {
                res.status(200).json({ mensage: "Service updated successfully" });
            }
        } catch (err) {
            next(err);
        };
    };

    static async deleteService(req, res) {
        try {
            await run();
            const Service = new ObjectId(req.params.id);
            const result = await collection.deleteOne({ "_id": Service });
            await closeBd();
            if (result.deletedCount == 0) {
                res.status(200).json({ mensage: "No Service deleted!" });
            } else {
                res.status(200).json({ mensage: "Service deleted successfully" });
            }
        } catch (err) {
            next(err);
        };
    };
};

export default ServiceController;