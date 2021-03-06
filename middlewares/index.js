//UNIFICACION de archivos para las importaciones
//al llamarse index.js, por consiguiente si apunto a la 
//carpeta de middlewares, por default busca index.js

const validarArchivo = require('../middlewares/validar-archivo')
const validarCampos = require('../middlewares/validar-campos')
const validarJWT = require('../middlewares/validar-jwt')
const validaRoles = require('../middlewares/validar-roles')


module.exports = {
    ...validarArchivo,
    ...validarCampos,
    ...validarJWT,
    ...validaRoles,
}