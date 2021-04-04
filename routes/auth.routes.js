const { Router } = require('express')
const { check } = require('express-validator')
const { login, googleSingIn } = require('../controllers/auth.controller')
const { validarCampos } = require('../middlewares/validar-campos')

//Enrutador
const router = Router()

//Login interno
router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login)

//Google Login
router.post('/google', [
    check('id_token', 'El id_token es requerido').not().isEmpty(),
    validarCampos
], googleSingIn)


module.exports = router

