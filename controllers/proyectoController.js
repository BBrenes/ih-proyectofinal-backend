const Proyecto = require("./../models/Proyecto");
const { validationResult } = require("express-validator");

exports.crearProyecto = async (req, res) => {
  //Revisar si hay errores en la validacion de los checks
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.json({
      errores: errores.array(),
    });
  }
  //Crear proyecto en BD
  try {
    //Crear un proyecto a partir del modelo
    const proyecto = new Proyecto(req.body);
    //Obtener el id del usuario que creó este proyecto
    proyecto.creador = req.usuario.id;
    //Guardar el proyecto en BD
    proyecto.save();
    res.json({
      mensaje: "todo ok",
      proyectoCreado: proyecto,
    });
  } catch (e) {
    res.status(400).json({
      msg: "Hubo un error en servidor",
    });
  }
};

exports.obtenerProyectos = async (req, res) => {
  //Obtener todos los proyectos del usuario en cuestion
  try {
    const listaProyectos = await Proyecto.find({
      creador: req.usuario.id,
    }).sort({ creado: -1 });
    res.json({
      listaProyectos,
    });
  } catch (e) {
    res.status(400).json({
      msg: e,
    });
  }
};

exports.actualizarProyecto = async (req, res) => {
  //Revisar si hay errores en la validacion de los checks
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.json({
      errores: errores.array(),
    });
  }
  //Extraer la información del proyecto
  const { nombre } = req.body;
  //Crear un nuevo proyecto vacío donde le insertaremos la nueva información
  const nuevoProyecto = {};
  //Agregar el nombre al nuevo proyecto (objeto)
  nuevoProyecto.nombre = nombre;
  //Agregar fecha de actualizacion
  nuevoProyecto.actualizado = Date.now();
  try {
    //Revisión del ID del proyecto, necesito identificar el proyecto que voy a modificar
    let proyecto = await Proyecto.findById(req.params.id);
    console.log(proyecto)
    //En caso de que no exista ese proyecto en la base de datos
    if (!proyecto) {
      return res.status(400).json({
        msg: "Proyecto no encontrado",
      });
    }
    //Verificación de que el usuario es el autor de ese proyecto
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(400).json({
        msg: "Otro usuario está intentando cambiar un proyecto que no es suyo.",
      });
    }
    //Si si existe, avanzamos
    proyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id.toString() },
      { $set: nuevoProyecto },
      { new: true }
    );
    res.json({
      proyectoActualizado: proyecto,
    });
  } catch (e) {
    return res.status(400).json({
      msg: e,
    });
  }
};

exports.eliminarProyecto = async (req, res) => {
    //Tener el id del proyecto
    const proyectoId = req.params.id;
    console.log(proyectoId)
    try {
        //Encontrar el proyecto en pase de datos
        let proyecto = await Proyecto.findById(req.params.id);
        console.log(proyecto)
        //Si el proyecto no se encontró
        if (!proyecto) {
        return res.status(400).json({
            msg: "Proyecto no encontrado",
        });
        }
        //Verificación de que el usuario es el autor de ese proyecto
        if (proyecto.creador.toString() !== req.usuario.id) {
        return res.status(400).json({
            msg: "Otro usuario está intentando cambiar un proyecto que no es suyo.",
        });
        }
        //Eliminacion del proyecto
        await Proyecto.findOneAndRemove({ _id: proyectoId });
        res.json({
        msg: "El proyecto fue eliminado",
        });
    } catch (e) {
        res.status(400).json({
        msg: "Hubo un error en el servidor",
        });
    }
};
