//Importaciones
const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const usuarioController = require("./../controllers/usuarioController")

//Rutas
//Crear un usuario
router.post('/',
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("email", "Agrega un email").isEmail(),
        check("password", "El password debe tener mínimo 6 caracteres").isLength({min:6})
    ], usuarioController.crearUsuario)


router.get('/mike', (req,res) => {
    res.json({
        ejemplo: "123"
    })
})

module.exports = router