//Importaciones
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const usuarioGatoController = require("../controllers/usuarioGatoController")

//Ruteo /api/usuariogatos
//CRUD - Gatos

//Ruta1
//Leer/Obtener todos los gatos
router.get("/", auth,
    usuarioGatoController.obtenerGatos
)

//Ruta2
//Leer/Obtener un gatito para ver sus detalles
router.get("/:id", auth,
    usuarioGatoController.obtenerGato
)

module.exports = router