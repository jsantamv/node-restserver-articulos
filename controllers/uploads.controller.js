const { response } = require("express");
const { subirArchivo } = require('../helpers')


const cargarArchivo = async (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).send('No hay archivos que subir.');
    }

    try {
        //const nombre = await subirArchivo(req.files, ['txt', 'md'],'textos')
        //con undefine lo mandamos por defecto
        const nombre = await subirArchivo(req.files, undefined, 'img')

        res.json({ nombre })
    } catch (msg) {
        res.status(400).json(msg)
    }

}

module.exports = {
    cargarArchivo
}