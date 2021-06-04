//Importaciones
const Usuario = require('./../models/Usuario')
const bcryptjs = require("bcryptjs")
const {validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")

//Controllers
//Iniciar Sesion Usuario
//Obtener el token, confirmando que el usuario y contraseña es correcta.
exports.iniciarSesionUsuario = async(req, res) => {
    //Revisar si hay errores en la validacion de los checks
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
       return res.json({
         errores: errores.array(),
       });
    }
    //Extraer el email y password para verificarlos contra base de datos
    const {email, password} = req.body
    //Revisar que el usuario esté en basa de datos
    try{
        let usuarioBD = await Usuario.findOne({ email })
        //Si no encontramos al usuario
        if(!usuarioBD){
            return res.status(400).json({
                msg: "El usuario no existe, crea uno."
            })
        }
        //Revisar si el password es el correcto
        let passwordCorrecto = await bcryptjs.compare(password, usuarioBD.password)
        if(!passwordCorrecto){
            return res.status(400).json({
                msg: "Password incorrecto. Intenta nuevamente."
            })
        }
        //Si todo está OK, hay que crear la firma de JWT
        const payload = {
            usuario: {
                id: usuarioBD.id
            }
        }
        jwt.sign(
            payload,
            process.env.SECRETA,
            {
                expiresIn: 360000 //100 horas
            },
            (error, token) => {
                if(error) throw error
                //Devolvamos el token hacia el cliente (postman o chrome)
                res.json({token})
            }
        )
    }catch(e){
        res.status(400).json({
            msg: "Hubo un error en el servidor"
        })
    }
}

exports.verificarUsuario = async(req, res) => {
    const userId = req.usuario.id
    try{
        let usuario = await Usuario.findById(userId).select('-password')
        res.json({
            usuario
        })
    }catch(e){
        console.log(e)
        res.status(400).json({
            msg: "Hubo un error en el servidor"
        })
    }
}