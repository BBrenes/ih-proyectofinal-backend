//Importaciones
const Usuario = require('./../models/Usuario')

module.exports = async(req, res, next) => {
    const userId = req.usuario.id
    try{
        let usuario = await Usuario.findById(userId).select('-password')
        //Revisar si el usuario es admin o no
        if(usuario.rol !== 'admin'){
            return res.status(400).json({
                msg: "No eres un administrador"
            })
        }
        next()
    }catch(e){
        console.log(e)
        res.status(400).json({
            msg: "Hubo un error en el servidor"
        })
    }
}