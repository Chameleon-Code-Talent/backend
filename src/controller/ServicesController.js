import { run, closeBd, database } from "../../config/dbConnection.js";
import { ObjectId } from "mongodb";
const collection = database.collection("services");

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

    static async searchServiceById(req, res) {
        try {
            await run();
            const Service = new ObjectId(req.params.id);
            const result = await collection.findOne({ "_id": Service });
            await closeBd();
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        };
    };

    static async registerService(req, res) {
        try {
            const newService = req.body;
            await run();
            const result = await collection.insertOne(newService);
            res.status(200).json(result);
            await closeBd();
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        };
    };

    static async updateService(req, res) {
        try {
            await run();
            const id_Service = new ObjectId(req.params.id);
            const result = await collection.updateOne({ "_id": id_Service }, { $set: req.body });
            await closeBd();
            res.status(200).json({ mensage: "Service updated successfully" });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        };
    };

    static async deleteService(req, res) {
        try {
            await run();
            const Service = new ObjectId(req.params.id);
            const result = await collection.deleteOne({ "_id": Service });
            await closeBd();
            res.status(200).json({ mensage: "Service deleted successfully" });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        };
    };
};

export default ServiceController;