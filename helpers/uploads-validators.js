const path = require('path')
const { v4: uuidv4 } = require('uuid');

const extDefault = ['png', 'jpg', 'jpeg', 'gif']

const subirArchivo = (files, extValidadas = extDefault) => {

    return new Promise((resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[nombreCortado.length - 1]

        //Validar la extencion
        const extesionesValidas = extValidadas;
        
        if (!extesionesValidas.includes(extension)) {
            return reject(`La extencion ${extension} no es valida, Validas: ${extesionesValidas} `)
        }

        const nombreTmp = uuidv4() + '.' + extension

        const uploadPath = path.join(__dirname, '../uploads/', nombreTmp);

        // Use the mv() method to place the file somewhere on your server
        archivo.mv(uploadPath, function (err) {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({ msg: 'File uploaded!' + uploadPath });
        })


    })


}


module.exports = {
    subirArchivo
}