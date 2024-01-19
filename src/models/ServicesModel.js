import { Int32, ObjectId } from "mongodb";
import { run, closeBd, database } from "../../config/dbConnection.js";

const conn = () => { run().catch(console.dir); };

async function createCollectionValidate() {
    if (!database.collection("skills")) {
        database.createCollection("services", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    title: "Services object validation",
                    required: ["id_user", "services"],
                    properties: {
                        id_user: {
                            bsonType: String,
                            description: "'id_user' must be a String and is required"
                        },
                        services: {
                            bsonType: String,
                            description: "Services id required"
                        },
                        icon_service: {
                            bsonType: String
                        }
                    }
                }
            }
        });
    }
};
export default createCollectionValidate;