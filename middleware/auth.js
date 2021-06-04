const jwt = require('jsonwebtoken')

module.exports = async(req, res, next) => {

    //Recibir el token del front (insertado en el header con localstorage)
    const token = req.header('x-auth-token')
    
    //Revisar si no hay token
    if(!token){
        return res.status(400).json({
            msg: "No hay token, permiso no válido"
        })
    }
    //Si sí hay token, validalo
    try{
        const verificacionCifrado = await jwt.verify(token, process.env.SECRETA)
        req.usuario = verificacionCifrado.usuario
        next()
    } catch(e){
        res.status(400).json({
            msg: "Hubo una falla con el token"
        })
    }
  

}