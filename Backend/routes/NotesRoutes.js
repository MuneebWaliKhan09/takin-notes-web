const express = require("express")
const router = express.Router();
const Notes = require("../models/NotesModel")





router.get("/allnotes", async (req, res) => {

    const notes = await Notes.find();

    res.status(201).json(notes)

})




router.post("/addnotes", async (req, res) => {

    const { Title, Description } = req.body;

    if (!Title || !Description) {
        res.status(422).json("fill all the feilds")
    }

    try {
        const createNotes = await Notes.create({
            Title,
            Description
        })

        if (createNotes) {
            res.status(201).json({ messsage: "Note Created Done !", createNotes })
        }
        else {
            res.status(201).json({ messsage: "Error Not Created !" })

        }

    } catch (error) {
        res.status(422).json("erorr during creattion")
    }


})





router.delete("/deletenotes/:id", async (req, res) => {

    const user = await req.params.id;


    const deletedNotes = await Notes.findByIdAndDelete(user);

    res.status(201).json({ message: "Deleted Done !", deletedNotes })


})



router.put("/updatenotes/:id", async (req, res) => {

    const user = await req.params.id;


    const UpdateNotes = await Notes.findByIdAndUpdate(user, req.body, {
        new: true
    });

    res.status(201).json({ message: "Updated Done !", UpdateNotes })


})















module.exports = router;