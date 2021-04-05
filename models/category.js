
const { Schema, model } = require('mongoose')

const CategorySchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

//Sobreescribimos el metodo de toJSON
//para retornar solo lo que quiero
CategorySchema.methods.toJSON = function () {
    const { __v,
        _id,
        ...data
    } = this.toObject()

    //transformar _id de db mongo en uid
    data.uid = _id
    return data
}

module.exports = model('Category', CategorySchema)

