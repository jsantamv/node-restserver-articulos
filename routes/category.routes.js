const { Router } = require('express')
const { check } = require('express-validator')
const { crearCategoria,
     obtenerCategorias,
     obtenerCategoria,
     actualizarCategoria,
     eliminarCategoria } = require('../controllers/category.controller')

const { existeCategoria } = require('../helpers/db-validators')

const { validarJWT,
     validarCampos,
     esAdminRole } = require('../middlewares')
const router = Router()


/** path
 * {{url}}/api/categorias
 * publico
 */
router.get('/', obtenerCategorias)

//**Obtener categorias por ID publico*/
router.get('/:id', [
     check('id', 'No es un Id valido').isMongoId(),
     check('id').custom(existeCategoria),
     validarCampos
], obtenerCategoria)

/**Crear nueva categoria
 * Privado: Cualquier persona con token valido
 */
router.post('/', [
     validarJWT,
     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
     validarCampos
], crearCategoria)

/**
 * Actualizar la categoria por id
 * Privado: Con usuario con token valido
 */
router.put('/:id', [
     validarJWT,
     check('id', 'No es un Id valido').isMongoId(),
     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
     check('id').custom(existeCategoria),
     validarCampos
], actualizarCategoria)

/**
 * Borrar categoria logica
 * Privado - Solo administrador
 */
router.delete('/:id', [
     validarJWT,
     esAdminRole,
     check('id', 'No es un Id valido').isMongoId(),
     validarCampos,
     check('id').custom(existeCategoria),
     validarCampos
], eliminarCategoria)



module.exports = router
