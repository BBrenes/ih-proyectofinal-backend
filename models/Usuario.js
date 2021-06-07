//Importaciones
const mongoose = require('mongoose')
const { Schema } = require('mongoose')

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
    },
    rol: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    nombreCompleto: {
        type: String,
    },
    direccion: {
        type: String,
    },
    telefono: {
        type: String,
    },
    perfilCompleto: {
        type: Boolean,
        default: false
    },
    favoritos: 
        [{ type: Schema.Types.ObjectId, ref: 'Gato' }]
}, {
    timestamps: true
})

//Modelo
const Usuario = mongoose.model("Usuario", UsuarioSchema)

//Exportacion
module.exports = Usuario