const { Router } = require('express')
const { check } = require('express-validator')
const { cargarArchivo } = require('../controllers')

const { validarCampos } = require('../middlewares/validar-campos')

//Enrutador
const router = Router()

router.post('/', cargarArchivo)



module.exports = router

