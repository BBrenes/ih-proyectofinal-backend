//Importaciones
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const {check} = require('express-validator')
const adminGatoController = require("../controllers/adminGatoController")

//Ruteo /api/admingatos
//CRUD - Gatos

//Ruta1
//Crear Gato
router.post("/", auth, authAdmin,
    [
        check("nombre", "El nombre del gato es obligatorio.").not().isEmpty(),
        check("edad", "La edad del gato es obligatoria.").not().isEmpty(),
        check("genero", "El género del gato es obligatorio.").not().isEmpty(),
        check("esterilizado", "El campo 'esterilizado' es obligatorio.").not().isEmpty(),
        check("descripcion", "La descripción del gato es obligatoria.").not().isEmpty(),
        check("imagenUrl", "La imagen del gato es obligatoria").not().isEmpty()
    ], adminGatoController.crearGato)

//Ruta2
//Leer/Obtener todos los gatos
router.get("/", auth, authAdmin,
    adminGatoController.obtenerGatos
)

//Ruta3
//Leer/Obtener un gatito para editar
router.get("/:id", auth, authAdmin,
    adminGatoController.obtenerGato
)

//Ruta4
//Actualizar un gato
router.put("/:id", auth, authAdmin,
    [
        check("nombre", "El nombre del gato es obligatorio.").not().isEmpty(),
        check("edad", "La edad del gato es obligatoria.").not().isEmpty(),
        check("genero", "El género del gato es obligatorio.").not().isEmpty(),
        check("esterilizado", "El campo 'esterilizado' es obligatorio.").not().isEmpty(),
        check("descripcion", "La descripción del gato es obligatoria.").not().isEmpty(),
        check("imagenUrl", "La imagen del gato es obligatoria").not().isEmpty()
    ], adminGatoController.actualizarGato)

//Ruta5
//Borrar un gato
router.delete("/:id", auth, authAdmin,
    adminGatoController.eliminarGato
)

module.exports = router