const { response } = require("express");


const cargarArchivo = (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).send('No hay archivos que subir.');
    }

    
}



module.exports = {
    cargarArchivo
}