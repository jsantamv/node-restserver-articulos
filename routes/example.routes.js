const { Router, response } = require('express')
const { check } = require('express-validator')
const { obtenerProductos } = require('../controllers/product.controller')

const router = Router()


router.get('/', obtenerProductos)

module.exports = router