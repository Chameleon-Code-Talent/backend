import BaseError from "./BaseError.js";

class ValidationError extends BaseError {
    constructor(errors, message = "Document failed validation!", status = 400) {
        super(message, status);
        this.errors = errors;
        this.message = message
    }

    async sendFieldsRequired(res) {
        //check source of error
        if (this.errors.font == "propertiesNotSatisfied") {

            //array for avaliation
            const propertiesAvaliate = this.errors.properties.propertiesNotSatisfied

            //array for response 
            let propertiesNotSatisfied = [];

            //loop to only get the property that is wrong
            propertiesAvaliate.forEach(obj => {
                if ('propertyName' in obj) {
                    propertiesNotSatisfied.push(obj.propertyName);
                }
            });

            //reponse formatted
            return res.status(this.status).json({
                message: this.message,
                accepted_data_type: this.errors.error.specifiedAs.bsonType,
                properties_found: propertiesNotSatisfied
            })
        }

        res.status(this.status).json({ message: this.message, fields_not_filled_in: this.errors })
    }
}

export default ValidationError;