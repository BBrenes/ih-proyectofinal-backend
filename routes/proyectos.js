//Importaciones
const express = require('express')
const router = express.Router()
const auth = require('./../middleware/auth')
const {check} = require('express-validator')
const proyectoController = require("./../controllers/proyectoController")

//Ruteo /api/proyectos
//CRUD - Proyectos

//Ruta1
//Crear Proyecto
router.post("/", auth,
    [
        check("nombre", "El nombre del proyecto es obligatorio.").not().isEmpty()
    ], proyectoController.crearProyecto)

//Ruta2
//Leer/Obtener todos los proyectos
router.get("/", auth,
    proyectoController.obtenerProyectos
)

//Ruta3
//Actualizar un proyecto
router.put("/:id", auth,
    [
        check("nombre", "El nombre del proyecto es obligatorio.").not().isEmpty()
    ], proyectoController.actualizarProyecto)

//Ruta4
//Borrar un proyecto
router.delete("/:id",
    auth,
    proyectoController.eliminarProyecto
)

module.exports = router