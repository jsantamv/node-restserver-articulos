const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('colors')

//libreria para la conecion con MongoDB
const { dbConnection } = require('../database/config')
const fileUpload = require('express-fileupload')


class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT

        //defino mis rutas
        this.path = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            category: '/api/category',
            users: '/api/users',
            product: '/api/product',
            uploads: '/api/uploads'
        }

        //conectar a la db
        this.databaseCNN()

        //Middlewares 
        this.middleware()

        // Routes de mi app
        this.routes();
    }

    //Realizo la conexion con MongoDb cuando levanto el app
    async databaseCNN() {
        await dbConnection()
    }

    middleware() {
        //CORS        
        this.app.use(cors())

        //Lectura y Parseo del Body
        //lo que viene formatea en JSON
        this.app.use(express.json())

        // directorio publico
        this.app.use(express.static('public'))

        // File Upload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes() {
        this.app.use(this.path.auth, require('../routes/auth.routes'))
        this.app.use(this.path.buscar, require('../routes/buscar.routes'))
        this.app.use(this.path.category, require('../routes/category.routes'))
        this.app.use(this.path.product, require('../routes/product.routes'))
        this.app.use(this.path.uploads, require('../routes/uploads.routes'))
        this.app.use(this.path.users, require('../routes/user.routes'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server Listen => http://localhost:${this.port}`.bgBlue)
        })
    }
}

module.exports = Server