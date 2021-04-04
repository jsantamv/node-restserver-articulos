const { Router } = require('express')
const { check } = require('express-validator')
const { crearCategoria } = require('../controllers/category.controller')

const { validarJWT, validarCampos } = require('../middlewares')

const router = Router()


/** path
 * {{url}}/api/categorias
 * publico
 */
router.get('/', (req, res) => {
     res.json('get')
})


//**Obtener categorias por ID publico*/
router.get('/:id', (req, res) => {
     res.json('get by id')
})

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
router.put('/:id', (req, res) => {
     res.json('put')
})

/**Borrar categoria logica
 * Privcado - Solo administrador
 */
router.delete('/:id', (req, res) => {
     res.json('delete')
})


module.exports = router
