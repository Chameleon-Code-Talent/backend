import { Int32 } from "mongodb";
import { run, closeBd, database } from "../../config/dbConnection.js";

const conn = () => { run().catch(console.dir); };

async function createCollectionValidate() {
    if (!database.collection("projects")) {
        database.createCollection("projects", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    title: "Users object validation",
                    required: ["thumbnail", "title", "technologies", "description"],
                    properties: {
                        thumbnail: {
                            bsonType: String,
                            description: "'thumbnail' is required"
                        },
                        title: {
                            bsonType: String,
                            description: "'title' is required"
                        },
                        project_images: {
                            bsonType: String,
                            description: "'project_images' filed not found"
                        },
                        technologies: {
                            bsonType: String,
                            description: "'technologies' is required"
                        },
                        description: {
                            bsonType: Int32,
                            description: "'description' is required"
                        },
                    }
                }
            }
        })
    };
};

export default createCollectionValidate;
