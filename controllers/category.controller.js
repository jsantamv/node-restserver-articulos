const { response } = require("express")
const { Category } = require("../models")



const obtenerCategorias = async (req, res = response) => {

    const { limite = 5, desde = 0, estado = true } = req.query
    const querie = { estado }

    const [total, categorias] = await Promise.all([
        Category.countDocuments(querie),
        Category.find(querie)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre')
            .exec()
    ])

    res.json({
        total,
        categorias
    })
}


const obtenerCategoria = async (req, res = response) => {
    const { id } = req.params

    const result = await Category.findById(id)
        .populate('usuario', 'nombre')

    res.json({
        result
    })

}


const crearCategoria = async (req, res = response) => {

    try {

        const nombre = req.body.nombre.toUpperCase()
        const categoriaDb = await Category.findOne({ nombre })

        if (categoriaDb) {
            return res.status(400).json({
                msg: `La Categoria: ${categoriaDb.nombre} ya existe`
            })
        }

        //Generar data a guardar
        const data = {
            nombre,
            usuario: req.usuario._id
        }

        const category = new Category(data)

        //guardar en db
        await category.save()

        res.status(201).json(category)

    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

const actualizarCategoria = async (req, res = response) => {

    const { id } = req.params

    //extraigo datos que no voy a modificar
    const { estado, usuario, ...data } = req.body
    data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuario._id

    const result = await Category.findByIdAndUpdate(id, data, { new: true })
        .populate('usuario', 'nombre')

    res.json({ result })
}


const eliminarCategoria = async (req, res = response) => {
    const { id } = req.params

    const data = {
        estado: false,
        usuario: req.usuario._id
    }

    const result = await Category.findByIdAndUpdate(id, data, { new: true })
        .populate('usuario', 'nombre')

    res.json({ result })
}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    eliminarCategoria
}
