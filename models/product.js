
const { strikethrough } = require('colors')
const { Schema, model } = require('mongoose')

const ProductSchema = Schema({
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
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    descripcion: { type: String },
    disponible: { type: Boolean,default: true }
})

//Sobreescribimos el metodo de toJSON
//para retornar solo lo que quiero
ProductSchema.methods.toJSON = function () {
    const { __v, _id, ...data } = this.toObject()
    //transformar _id de db mongo en uid
    data.uid = _id
    return data
}

module.exports = model('Product', ProductSchema)