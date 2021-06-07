const Gato = require("../models/Gato");

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

