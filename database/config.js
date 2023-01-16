const moongose = require("mongoose");
require("dotenv").config();


dbConnection().catch(err => console.log(err));

async function dbConnection(){
    await moongose.connect(process.env.MONGODB_CONNECTION);
    console.log("DB conectada");
}

module.exports = {
    dbConnection
}