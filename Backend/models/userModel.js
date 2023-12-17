const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const key = "jzhjkhdjkasdhakjshdaksjhdkadhajsh"

const UserSchema = mongoose.Schema(
    {
        UserName: {
            type: String,
            required: true,
            trim: true
        },

        Email: {
            type: String,
            required: true,
            trim: true,
            validator(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("not valid email")
                }
            }

        },

        Password: {
            type: String,
            required: true,
        },


        tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
    },

    {
        timestamps: true
    }
)


UserSchema.pre("save", async function (next) {
    if (this.isModified("Password")) {
        this.Password = await bcrypt.hash(this.Password, 12)
    }

    next();
})


UserSchema.methods.generateAuthToken = async function () {
    try {
        let newToken = jwt.sign({ _id: this._id }, key, {
            expiresIn: "1d"
        })
        this.tokens = this.tokens.concat({ token: newToken })

        await this.save()
        return newToken;

    } catch (error) {
        res.status(422).json(error)
    }
}





module.exports = mongoose.model("users", UserSchema)