const express = require("express");
const cors = require('cors');
const {dbConnection} = require("./database/config");
//para usar las variables de entorno
require("dotenv").config();


//creacion del server
const app = express();

//conexion a la BD
dbConnection

//cors
app.use(cors());

//lectura y parse del body
app.use(express.json());

app.use("/api/auth", require("./routes/auth_routes"));

app.listen(process.env.PORT, () =>{
    console.log(`Servidor ejecutandose en el puerto ${process.env.PORT}`)
})