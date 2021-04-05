const mongoose = require('mongoose');
require('colors')


const dbConnection = async () => {
    try {

        await mongoose.connect(process.env.MONGO_DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false //Utilizar ciertas funciones 
        });

        console.log('ServerDB Status => OnLine'.bgGreen)

    } catch (err) {
        console.log(err)
        throw new Error('>>> ERROR A LA HORA DE INCIAR LA BASE DE DATOS <<<'.red)
    }
}

module.exports = {
    dbConnection
}