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
            //verify filled fields
            if (req.body.id_user == "" || req.body.services == "") {
                return res.status(400).json({ message: "some mandatory fields were not filled in" })
            }

            const newService = req.body;

            //variable where the new service will be saved
            let addService;
            let addIconService;

            //configure icons patterns for saved in BD
            if (!newService.icon_service || newService.icon_service == "" || newService.icon_service == [""]) {
                //variavbe in escope local for saved icons_service patterns
                let iconsPatterns = [];

                newService.services.forEach(element => {
                    iconsPatterns.push(`no-icon-${element}`);
                    newService.icon_service = iconsPatterns;
                });
            }
            await run();
            //verify services exists
            const servicesExists = await collection.find().toArray();

            if (servicesExists[0]) {
                //get id of the skill document and skill data
                const IdDocument = new ObjectId(servicesExists[0]._id);
                const servicesExistsInTheDocument = servicesExists[0].services;
                const iconServicesExistsInTheDocument = servicesExists[0].icon_service;

                //comparing array of existing and new services to find out if it already exists
                addService = newService.services
                    .filter(service => !servicesExistsInTheDocument
                        .includes(service));

                //comparing array of existing and new icons services to find out if it already exists
                addIconService = newService.icon_service
                    .filter(icon_service => !iconServicesExistsInTheDocument
                        .includes(icon_service));

                //push the array to save new information without losing existing information
                servicesExistsInTheDocument.forEach(e => {
                    addService.push(e);
                });

                iconServicesExistsInTheDocument.forEach(e => {
                    addIconService.push(e)
                });

                //insert new changes in the document
                const modifiedService = {
                    "services": addService,
                    "icon_service": addIconService
                }

                const result = await collection.updateOne({ "_id": IdDocument }, { $set: modifiedService });
                await closeBd();
                return res.status(200).json({ message: "New services inserted succesfully" })
            }

            const id_user = new ObjectId(newService.id_user);

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