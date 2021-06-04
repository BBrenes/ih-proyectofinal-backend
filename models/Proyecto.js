const mongoose = require('mongoose')

const ProyectoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    creado: {
        type: Date,
        default: Date.now()
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    actualizado: {
        type: Date,
        default: Date.now()
    }
})

const Proyecto = mongoose.model('Proyecto', ProyectoSchema)

module.exports = Proyecto