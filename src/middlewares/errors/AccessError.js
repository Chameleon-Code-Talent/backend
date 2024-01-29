import BaseError from "./BaseError.js";

class AccessError extends BaseError {
    constructor(message = "Access Denied!", status = 401) {
        super(message, status);
    };
};

export default AccessError;