const { response } = require("express");
const { body } = require("express-validator");
const { Product } = require("../models");

/**
 * Creacion de un producto
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const crearProducto = async (req, res = response) => {

    try {

        const { estado, usuario, ...body } = req.body

        body.nombre = req.body.nombre.toUpperCase()

        const productoDb = await Product.findOne({ nombre: body.nombre })

        if (productoDb) {
            return res.status(400).json({
                msg: `El producto: ${productoDb.nombre} ya existe`
            })
        }

        //Generar data a guardar
        const data = {
            ...body,
            usuario: req.usuario._id,
        }

        const product = new Product(data)

        //guardar en db
        await product.save()

        res.status(201).json(product)

    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}


/**
 * Obtiene un listado de los productos
 * @param {*} req 
 * @param {*} res 
 */
const obtenerProductos = async (req, res = response) => {

    const { limite = 5, desde = 0, estado = true } = req.query
    const querie = { estado }

    const [total, productos] = await Promise.all([
        Product.countDocuments(querie),
        Product.find(querie)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
    ])

    res.json({
        total,
        productos
    })
}


/**
 * Obtiene un listado de los productos
 * @param {*} req 
 * @param {*} res 
 */
const obtenerProducto = async (req, res = response) => {

    const { id } = req.params

    const result = await Product.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
    res.json({
        result
    })
}


const actualizarProducto = async (req, res = response) => {
    try {
        const { id } = req.params

        //extraigo datos que no voy a modificar
        const { estado, usuario, ...data } = req.body

        if (data.nombre) {
            data.nombre = data.nombre.toUpperCase()
        }

        data.usuario = req.usuario._id
        data.precio = req.body.precio ? req.body.precio : 0


        const result = await Product.findByIdAndUpdate(id, data, { new: true })
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')

        res.json({ result })

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

/**
 * Elimina un producto
 * @param {*} req request
 * @param {*} res response
 */
const eliminarProducto = async (req, res = response) => {

    const { id } = req.params

    const data = {
        estado: false,
        usuario: req.usuario._id
    }

    const result = await Product.findByIdAndUpdate(id, data, { new: true })
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')

    res.json({ result })
}


module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
}