import { Int32, ObjectId } from "mongodb";
import { run, closeBd, database } from "../../config/dbConnection.js";

const conn = () => { run().catch(console.dir); };

async function createCollectionValidate() {
    if (!database.collection("projects")) {
        database.createCollection("projects", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    title: "Users object validation",
                    required: ["id_user", "thumbnail", "title", "technologies", "description"],
                    properties: {
                        id_user: {
                            bsonType: "string",
                            description: "'id_user' must be a string and is required"
                        },
                        thumbnail: {
                            bsonType: "string",
                            description: "'thumbnail' is required"
                        },
                        title: {
                            bsonType: "string",
                            description: "'title' is required"
                        },
                        project_link: {
                            bsonType: "string"
                        },
                        project_images: {
                            bsonType: "array",
                            description: "'project_images' filed not found"
                        },
                        technologies: {
                            bsonType: "string",
                            description: "'technologies' is required"
                        },
                        icon_technologies: {
                            bsonType: "array"
                        },
                        description: {
                            bsonType: "string",
                            description: "'description' is required"
                        },
                    }
                }
            }
        })
    };
};

export default createCollectionValidate;
