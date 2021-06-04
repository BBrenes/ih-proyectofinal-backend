const moongose = require('mongoose')

const conectarDB = async () => {
    try{
        await moongose.connect(`mongodb://localhost:27017/tareasih`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log("Base de datos conectada")
    }catch(e){
        console.log(e)
        process.exit(1) //Detener la app
    }
}

module.exports = conectarDB