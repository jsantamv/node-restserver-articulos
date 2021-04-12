const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos, validarArchivo } = require('../middlewares')

const { cargarArchivo, actualizarArchivo } = require('../controllers')
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



module.exports = router

