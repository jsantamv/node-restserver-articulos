const path = require('path')
const { v4: uuidv4 } = require('uuid');

const extDefault = ['png', 'jpg', 'jpeg', 'gif']

const subirArchivo = (files, extValidadas = extDefault, carpeta = '') => {

    return new Promise((resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[nombreCortado.length - 1]

        //Validar la extencion
        if (!extValidadas.includes(extension)) {
            return reject(`La extencion ${extension} no es valida, Validas: ${extValidadas} `)
        }

        const nombreTmp = uuidv4() + '.' + extension

        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTmp);

        // Use the mv() method to place the file somewhere on your server
        archivo.mv(uploadPath, function (err) {
            if (err) {
                reject(err)
            }

            resolve(nombreTmp);
        })
    })
}


module.exports = {
    subirArchivo
}