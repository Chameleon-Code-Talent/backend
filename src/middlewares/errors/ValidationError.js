import BaseError from "./BaseError.js";

class ValidationError extends BaseError {
    constructor(errors, message = "Document failed validation!", status = 400) {
        super(message, status);
        this.errors = errors;
        this.message = message
    }

    sendFieldsRequired(res) {
        res.status(this.status).json({ message: this.message, fields_not_filled_in: this.errors })
    }
}

export default ValidationError;