//Importaciones
const express = require('express')
const cors = require ('cors') //Gestiona accesos entre aplicaciones Node.js
const conectarDB = require('./config/db')
const app = express()
const userRoutes = require('./routes/usuarios')
const authRoutes = require('./routes/auth')
const projectsRoutes = require('./routes/proyectos')
const adminGatosRoutes = require('./routes/adminGatos')
const usuarioGatosRoutes = require('./routes/usuarioGatos')
require('dotenv').config({
    path: '.env'
})

//Middlewares 
    //Conectar a la BD
    conectarDB()
    //Habilitar cruce de datos entre dos ambientes NodeJS (cors)
    app.use(cors())
    //Hablitar JSON en Express
    app.use(express.json({extended:true}))

//Ruteo - Importar rutas
    //Usuarios
    app.use('/api/usuarios', userRoutes)
    //Autenticacion
    app.use('/api/auth', authRoutes)
    //Proyectos
    app.use('/api/proyectos', projectsRoutes)
    //AdminGatos
    app.use('/api/admingatos', adminGatosRoutes)
    //UsuarioGatos
    app.use('/api/usuariogatos', usuarioGatosRoutes)

    app.get("/", (req, res) =>{
        res.send("Hola Mundo")
    })

//Servidor
app.listen(process.env.PORT, () => {
    console.log("El servidor está corriendo en el puerto 4000")
})