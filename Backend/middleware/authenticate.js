const jwt = require("jsonwebtoken")
const userDb = require("../models/userModel")
const key = "jzhjkhdjkasdhakjshdaksjhdkadhajsh";



const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const verifyToken = jwt.verify(token, key)
        const rootUser = await userDb.findOne({ _id: verifyToken._id })
        if (!rootUser) {
            { throw new Error("user not found") }
        }

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        next();

    } catch (error) {
        res.status(401).json({ status: 401, message: "Unauthorized no token provide" })

    }
}



module.exports = authenticate;