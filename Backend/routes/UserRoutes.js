const express = require("express")
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");



router.post("/register", async (req, res) => {
    const { UserName, Email, Password } = req.body;

    if (!UserName || !Email || !Password) {
        res.status(422).json("fill all the fields")
    }

    try {

        const preUser = await User.findOne({ Email: Email })

        if (preUser) {
            res.status(422).json({ error: "user Already exists !" })
        }
        else {
            const CreateUser = await User.create({
                UserName,
                Email,
                Password

            })

            res.status(201).json({ message: "User Registered Done", CreateUser })
        }

    } catch (error) {
        console.log(error)
    }
})










router.post("/login", async (req, res) => {

    const { Email, Password } = req.body


    if (!Email || !Password) {
        res.status(422).json("fill all the fields")
    }

    try {
        const findUser = await User.findOne({ Email: Email })

        if (findUser) {
            const CheckPass = await bcrypt.compare(Password, findUser.Password)

            if (!CheckPass) {
                res.status(422).json({ error: "invalid password" })
            }
            else {
                const genToken = await findUser.generateAuthToken();
                console.log(genToken)

                const result = {
                    findUser,
                    genToken
                }

                res.status(201).json({ message: "Loged In Done !", result })
            }
        }



    } catch (error) {
        console.log("user not found in data base", error)

    }




})


router.get("/validUser", authenticate, async (req, res) => {
    try {
        const validUser = await User.findOne({ _id: req.userId })
        res.status(201).json({ status: 201, validUser });


    } catch (error) {
        res.status(401).json({ status: 401, error });

    }


})



module.exports = router;