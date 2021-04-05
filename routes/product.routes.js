const { Router, response } = require('express')
const { check } = require('express-validator')

const { obtenerProductos,
    crearProducto,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto } = require('../controllers')

const { existeProducto, existeCategoria } = require('../helpers/db-validators')
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares')

const router = Router()


router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('categoria', 'No es un Id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
], crearProducto)


router.get('/', obtenerProductos)


router.get('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    validarCampos,
    check('id').custom(existeProducto),
    validarCampos
], obtenerProducto)

router.put('/:id', [
    validarJWT,
    check('id', 'No es un Id valido').isMongoId(),    
    //check('categoria', 'No es un Id de Mongo').isMongoId(),
    validarCampos,
    check('id').custom(existeProducto),
    validarCampos
], actualizarProducto)

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un Id valido').isMongoId(),
    validarCampos,
    check('id').custom(existeProducto),
    validarCampos
], eliminarProducto)


module.exports = router

