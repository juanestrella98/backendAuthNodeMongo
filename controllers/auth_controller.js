const {response} = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const crearUsuario = async (req, res = response)=>{
    const {email, name, password} = req.body; //desparametrizar el body del json

    try {
        //verificamos que el email no exista en la bd
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                ok:false,
                msg:"El email ya existe en otro ususario"
            })
        }

        //creamos usuario con el modelo
        const dbuser = new User(req.body);

        //hashear la contraseña
        const randomNumber = bcrypt.genSaltSync();// por defecto le da 10 vueltas a la contraseña
        dbuser.password = bcrypt.hashSync(password, randomNumber); //se encripta la contraseña

        //crear usuario en la bd
        await dbuser.save()

        //generar la respuesta exitosa
        return res.status(201).json({
            ok:true,
            uid:dbuser.id,
            name
        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:"Ocurrio un error"
        })
    }
}

const loginUsuario = (req, res = response)=>{
    return res.json({
        ok:true,
        msg:"Login usuario"
    })
}

const renovarUsuario = (req, res = response)=>{
    return res.json({
        ok:true,
        msg:"renovar usuario"
    })
}

module.exports = {
    crearUsuario, loginUsuario, renovarUsuario
}