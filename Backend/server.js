const express = require("express");
const cors = require("cors")
const col = require("colors")
const UserRoute = require("./routes/UserRoutes")
const NotesRoute = require("./routes/NotesRoutes")
const ConnectDb = require("./config/db")
const dotenv = require("dotenv").config({path: "./.env"})
const app = express()
const port = 8009

ConnectDb();





app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: "*",
    credentials: true
}))




app.use(UserRoute)
app.use(NotesRoute)


app.listen(port, console.log(`server started on port ${port}` .yellow))