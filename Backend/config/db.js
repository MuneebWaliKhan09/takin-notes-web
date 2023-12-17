const mongoose = require("mongoose")
console.log(process.env.MONGO_URI);

const DB_NAME = 'todos-app'

const ConnectDb = async () => {
    try {

        const conn = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`connected to database: ${conn.connection.host}`.cyan)
    }
    catch (error) {
        console.log(error)
        process.exit(1)

    }

}

module.exports = ConnectDb;