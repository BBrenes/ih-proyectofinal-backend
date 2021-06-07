//Importaciones
const express = require('express')
const router = express.Router()
const {check} = require('express-validator')
const authController = require('./../controllers/authController')
const auth = require('./../middleware/auth')

//Iniciar sesion
//api/auth
//El usuario no ha iniciado sesión y viene por su token
router.post("/", [
    check("email", "Agrega un email válido.").isEmail(),
    check("password", "El password debe ser mínimo de 6 caracteres.").isLength({min:6})
],authController.iniciarSesionUsuario)


//Verificar usuario, me va a mostrar su token 
router.get("/", auth, authController.verificarUsuario)

module.exports = router