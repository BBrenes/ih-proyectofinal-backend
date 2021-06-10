const {validationResult} = require("express-validator")
const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.crearUsuario = async (req, res) => {
  //Revision de express-validator
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.json({
      errores: errores.array(),
    });
  }
  //Extraer nombre, email y password del req
  const {email, password} = req.body

  //Buscar en base de datos si existe el usuario
  try{
    //Confirmar que el usuario es unico
    let usuario = await Usuario.findOne({email})
    //Si encontramos al usuario en DB
    if(usuario){
      return res.status(400).json({
        msg: "El usuario ya existe. Usa otro."
      })
    }
    //Si no encontramos al usuario, entonces si crea uno nuevo
    usuario = new Usuario(req.body)
    //Encriptamos el password
    const salt = await bcryptjs.genSalt(10)
    usuario.password = await bcryptjs.hash(password, salt)
    //Guardamos el usuario
    await usuario.save()
    //Creacion del payload para el JWT
    const payload = {
      usuario: {
        id: usuario.id
      }
    }
    //Generar el JWT y aplicarle una firma
    jwt.sign(
      payload, //Los datos que se envían al front (usuario.id)
      process.env.SECRETA,
      {
        expiresIn: 360000 //Expiracion en 100 horas
      },
      (error, token) => { //callback una vez que ejecutó todo lo de arriba
        if(error) throw error
        //Devolver resultado
        res.json({
          token: token
        })
      }
    )

  } catch (e){
    console.log(e)
    res.status(400).json({
      msg: "Hubo un error en el servidor"
    })
  }
};
