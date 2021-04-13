const path = require('path')
const fs = require('fs')
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const { response } = require("express");
const { subirArchivo } = require('../helpers')
const { User, Product } = require('../models');

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
            modelo = await Product.findById(id)
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
        if (fs.existsSync(pathImagen)) {
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

const obtenerImagen = async (req, res = response) => {



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
            modelo = await Product.findById(id)
            if (!modelo) {
                return res.status(400).json({ msg: `No existe el producto con el Id ${id}` })
            }
            break;

        default:
            return res.status(500).json({ msg: 'Olvide validar esto' })
            break;
    }



    //Obtenemos la imange
    if (modelo.img) {
        /*Busqueda de manera fisica*/
        // const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
        // if (fs.existsSync(pathImagen)) {
        //     return res.sendFile(pathImagen)
        // }

        //devolvemos la imagen url
        return res.json(modelo.img)
    }

    const pathImagen = path.join(__dirname, '../assets/no-image.jpg')
    res.sendFile(pathImagen)

}

/**
 * Actualizar archivo en el servidor de 
 * Clouddinary
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const actualizarArchivoClodinary = async (req, res = response) => {

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
            modelo = await Product.findById(id)
            if (!modelo) {
                return res.status(400).json({ msg: `No existe el producto con el Id ${id}` })
            }
            break;

        default:
            return res.status(500).json({ msg: 'Olvide validar esto' })
    }

    //Limpiamos imagnes previas
    if (modelo.img) {
        const nombreArr = modelo.img.split('/')
        const nombre = nombreArr[nombreArr.length - 1]
        const [public_id] = nombre.split('.')
        await cloudinary.uploader.destroy(public_id)
    }

    const { tempFilePath } = req.files.archivo
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath)
    modelo.img = secure_url

    await modelo.save()
    res.json(modelo)

}



module.exports = {
    cargarArchivo,
    actualizarArchivo,
    obtenerImagen,
    actualizarArchivoClodinary
}