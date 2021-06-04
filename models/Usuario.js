//Importaciones
const mongoose = require('mongoose')

//Schema
const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

//Modelo
const Usuario = mongoose.model("Usuario", UsuarioSchema)

//Exportacion
module.exports = Usuario