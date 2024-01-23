import { run, closeBd, database } from "../../config/dbConnection.js";

const conn = () => { run().catch(console.dir); };

async function createCollectionValidate() {
    if (!database.collection("skills")) {
        database.createCollection("skills", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    title: "Skills object validation",
                    required: ["id_user", "skills"],
                    properties: {
                        id_user: {
                            bsonType: "string",
                            description: "'id_user' must be a String and is required"
                        },
                        skills: {
                            bsonType: "array",
                            description: "'Skill' is required"
                        },
                        icon_skill: {
                            bsonType: "array"
                        }
                    }
                }
            }
        });
    };
};

export default createCollectionValidate;