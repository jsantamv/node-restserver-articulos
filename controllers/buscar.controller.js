const { response } = require("express")
const { ObjectId } = require("mongoose").Types
const { Category,
    Product,
    Server,
    User, } = require('../models')

const colecionesPermitadas = [
    'categorias',
    'productos',
    'roles',
    'usuarios',
]

const buscarUsuarios = async (termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino)

    if (esMongoId) {
        const usuario = await User.findById(termino)

        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    //Esto es para hacerla insensible a la mayus y minus
    const regex = new RegExp(termino, 'i')

    const usuarios = await User.find({
        $or: [{ nombre: regex }, { correo: regex }], //condiciones or en Mongo
        $and: [{ estado: true }]
    })

    const countResult = Object.keys(usuarios).length;

    return res.json({
        count: countResult,
        results: usuarios,
    })
}

const buscarCatgoria = async (termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino)

    if (esMongoId) {
        const result = await Category.findById(termino)
            .populate('usuario', 'nombre')


        return res.json({
            results: (result) ? [result] : []
        })
    }

    //Esto es para hacerla insensible a la mayus y minus
    const regex = new RegExp(termino, 'i')

    const usuarios = await Category.find({
        nombre: regex,
        $and: [{ estado: true }]
    })
        .populate('usuario', 'nombre')


    const countResult = Object.keys(usuarios).length;

    return res.json({
        count: countResult,
        results: usuarios,
    })
}

const buscarProductos = async (termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino)

    if (esMongoId) {
        const result = await (await Product.findById(termino))
            .populate('categoria', 'nombre')
            .populate('usuario', 'nombre')

        return res.json({
            results: (result) ? [result] : []
        })
    }

    //Esto es para hacerla insensible a la mayus y minus
    const regex = new RegExp(termino, 'i')

    const usuarios = await Product.find({
        nombre: regex,
        $and: [{ estado: true }]
    })
        .populate('categoria', 'nombre')
        .populate('usuario', 'nombre')

    const countResult = Object.keys(usuarios).length;

    return res.json({
        count: countResult,
        results: usuarios,
    })
}

const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params

    if (!colecionesPermitadas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las coleciones permitidas son: ${colecionesPermitadas}`
        })
    }

    switch (coleccion) {
        case 'categorias':
            buscarCatgoria(termino, res)
            break;
        case 'productos':
            buscarProductos(termino, res)
            break;
        case 'usuarios':
            buscarUsuarios(termino, res)
            break;
        default:
            res.status(500).json({
                msg: 'Se olvido hacer esta busqueda'
            })
    }
}


module.exports = {
    buscar
}