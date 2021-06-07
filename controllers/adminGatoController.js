const Gato = require("../models/Gato");
const { validationResult } = require("express-validator");

exports.crearGato = async (req, res) => {
  //Revisar si hay errores en la validacion de los checks
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.json({
      errores: errores.array(),
    });
  }
  //Crear gato en BD
  try {
    //Crear un gato a partir del modelo
    const gato = new Gato(req.body);
    //Guardar el gato en BD
    gato.save();
    res.json({
      mensaje: "Gato creado",
      gatoCreado: gato,
    });
  } catch (e) {
    res.status(400).json({
      msg: "Hubo un error en servidor",
    });
  }
};

exports.obtenerGatos = async (req, res) => {
  //Obtener todos los gatos
  try {
    const listaGatos = await Gato.find().sort({ actualizado: 1 });
    res.json({
      listaGatos,
    });
  } catch (e) {
    res.status(400).json({
      msg: e
    });
  }
};

exports.obtenerGato = async (req, res) => {
  //Obtener un gato para editarlo despues
  try {
    let gato = await Gato.findById(req.params.id);
    res.json({
      gato
    });
  } catch (e) {
    res.status(400).json({
      msg: e
    });
  }
};

exports.actualizarGato = async (req, res) => {
  //Revisar si hay errores en la validacion de los checks
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.json({
      errores: errores.array(),
    });
  }
  //Extraer la información del gato
  const { nombre, edad, genero, esterilizado, descripcion, imagenUrl } = req.body;
  //Crear un nuevo gato vacío donde le insertaremos la nueva información
  const nuevoGato = {};
  //Agregar la info al nuevo gato (objeto)
  nuevoGato.nombre = nombre;
  nuevoGato.edad = edad;
  nuevoGato.genero = genero;
  nuevoGato.esterilizado = esterilizado;
  nuevoGato.descripcion = descripcion;
  nuevoGato.imagenUrl = imagenUrl;
  //Agregar fecha de actualizacion
  nuevoGato.actualizado = Date.now();
  try {
    //Revisión del ID del gato, necesito identificar el gato que voy a modificar
    let gato = await Gato.findById(req.params.id);
    //En caso de que no exista ese gato en la base de datos
    if (!gato) {
      return res.status(400).json({
        msg: "Gato no encontrado",
      });
    }
    //Si si existe, avanzamos
    gato = await Gato.findByIdAndUpdate(
      { _id: req.params.id.toString() },
      { $set: nuevoGato },
      { new: true }
    );
    res.json({
      gatoActualizado: gato,
    });
  } catch (e) {
    return res.status(400).json({
      msg: e,
    });
  }
};

exports.eliminarGato = async (req, res) => {
    //Tener el id del gato
    const gatoId = req.params.id;
    try {
        //Encontrar el gato en pase de datos
        let gato = await Gato.findById(req.params.id);
        console.log(gato)
        //Si el gato no se encontró
        if (!gato) {
        return res.status(400).json({
            msg: "Gato no encontrado",
        });
        }
        //Eliminacion del gato
        await Gato.findOneAndRemove({ _id: gatoId });
        res.json({
        msg: "El gato fue eliminado",
        });
    } catch (e) {
        res.status(400).json({
        msg: "Hubo un error en el servidor",
        });
    }
};
