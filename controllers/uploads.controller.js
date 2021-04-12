const path = require('path')
const fs = require('fs')
const { response } = require("express");
const { subirArchivo } = require('../helpers')
const { User, Product } = require('../models');
const product = require("../models/product");


const cargarArchivo = async (req, res = response) => {
    try {
        //const nombre = await subirArchivo(req.files, ['txt', 'md'],'textos')
        //con undefine lo mandamos por defecto
        const nombre = await subirArchivo(req.files, undefined, 'img')

        res.json({ nombre })
    } catch (msg) {
        res.status(400).json(msg)
    }
}


const actualizarArchivo = async (req, res = response) => {

    const { id, coleccion } = req.params

    let modelo

    switch (coleccion) {
        case 'usuarios':
            modelo = await User.findById(id)
            if (!modelo) {
                return res.status(400).json({ msg: `No existe el usuario con el Id ${id}` })
            }
            break;

        case 'productos':
            modelo = await product.findById(id)
            if (!modelo) {
                return res.status(400).json({ msg: `No existe el producto con el Id ${id}` })
            }
            break;

        default:
            return res.status(500).json({ msg: 'Olvide validar esto' })
            break;
    }


    //Limpiamos imagnes previas
    if (modelo.img) {
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen)
        }
    }

    try {

        const nombre = await subirArchivo(req.files, undefined, coleccion)
        modelo.img = nombre
        await modelo.save()
        res.json({ modelo })

    } catch (msg) {
        res.status(400).json(msg)
    }

}


module.exports = {
    cargarArchivo,
    actualizarArchivo
}