import BaseError from "./errors/BaseError.js";
import AccessError from "./errors/AccessError.js";
import { BSON } from "mongodb";
import BSONErrorManipulation from "../middlewares/errors/BSONErrorManipulation.js";
import ValidationError from "./errors/ValidationError.js";

function errorManipulation(erro, req, res, next) {

    //mongodb errors
    if (erro instanceof BSON.BSONError) {
        return new BSONErrorManipulation(erro).sendResponse(res);
    }

    if (erro.message === "Document failed validation") {
        //checking the error
        //data type error
        if ("propertiesNotSatisfied" in erro.errInfo.details.schemaRulesNotSatisfied[0]) {
            //details of errors
            const details = erro.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].details[0];
            const propertiesNotSatisfied = erro.errInfo.details.schemaRulesNotSatisfied[0];

            //pre-formatted response
            const errors = {
                "error": details,
                "properties": propertiesNotSatisfied,
                "font": "propertiesNotSatisfied"
            }
            return new ValidationError(errors).sendFieldsRequired(res, errors);
        }

        //mandatory data not provided error
        if ("schemaRulesNotSatisfied" in erro.errInfo.details) {
            const errors = erro.errInfo.details.schemaRulesNotSatisfied[0].missingProperties;
            return new ValidationError(errors).sendFieldsRequired(res, errors);
        }
    }

    //error token
    if (
        erro.message === "invalid signature" ||
        erro.message === "invalid token" ||
        erro.message === "secret or public key must be provided" ||
        erro.message === "jwt must be provided") {
        return new AccessError().sendResponse(res);
    }

    new BaseError().sendResponse(res);


};

export default errorManipulation;