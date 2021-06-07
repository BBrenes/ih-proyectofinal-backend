const mongoose = require('mongoose')

const GatoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    edad: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true,
        enum: ['macho', 'hembra'],
    },
    esterilizado: {
        type: Boolean,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    imagenUrl: {
        type: String,
        required: true
    },
    adoptado: {
        type: Boolean,
        default: false
    },
    actualizado: {
        type: Date,
        default: Date.now()
    }
})

const Gato = mongoose.model('Gato', GatoSchema)

module.exports = Gato