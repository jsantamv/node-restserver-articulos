const { response } = require("express")
const { Category } = require("../models")


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


module.exports = {
    crearCategoria
}
