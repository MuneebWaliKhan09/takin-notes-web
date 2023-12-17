const mongoose = require("mongoose")


const NotesSchema = mongoose.Schema(
    {
        Title: {
            type: String,
            required: true
        },

        Description: {
            type: String,
            required: true
        }
    },

    {
        timestamps: true
    }
)




module.exports = mongoose.model("notes", NotesSchema)