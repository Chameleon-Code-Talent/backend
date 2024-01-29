import jwt, { decode } from 'jsonwebtoken';

//verify token authentication
async function verifyToken(req, res, next) {
    try {
        const signature = req.headers.authorization && req.headers.authorization.split(' ')[1];
        const token = jwt.verify(signature, process.env.SECRET_KEY)
        if (!token) {
            return res.status(401).json({ message: "Access denied!" })
        }
        next();
    } catch (err) {
        next(err)
    };
};

export default verifyToken;