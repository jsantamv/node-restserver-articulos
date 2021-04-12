const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos, validarArchivo } = require('../middlewares')

const { cargarArchivo, actualizarArchivo, obtenerImagen } = require('../controllers')
const { coleccionPermitidas } = require('../helpers')


//Enrutador
const router = Router()

router.post('/', validarArchivo, cargarArchivo)

router.put('/:coleccion/:id', [
    validarArchivo,
    check('id', 'Id debe de ser de Mongo').isMongoId(),
    check('coleccion').custom(c => coleccionPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarArchivo)

router.get('/:coleccion/:id', [
    check('id', 'Id debe de ser de Mongo').isMongoId(),
    check('coleccion').custom(c => coleccionPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], obtenerImagen)



module.exports = router

