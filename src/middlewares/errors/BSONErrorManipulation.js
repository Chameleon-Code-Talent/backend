class BSONErrorManipulation {
    constructor(errors) {
        this.errors = errors
    }

    sendResponse(res) {
        //input must be a 24 character hex string, 12 byte Uint8Array, or an integer
        if (this.errors.message === "input must be a 24 character hex string, 12 byte Uint8Array, or an integer") {
            return res.status(400).json({ message: "some data provided is incorrect" })
        }
    }
}

export default BSONErrorManipulation;