const { response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/users')
const { generarJWT } = require('../helpers/generarjwt')
const { googleVerify } = require('../helpers/google-verify')

const login = async (req, res = response) => {

    const { correo, password } = req.body

    try {

        // validar correo existe y usuario activo
        const usuario = await User.findOne({ correo })

        if (!usuario) {
            return res.status(401).json({
                msg: 'El usuario / password no son correctos - correo'
            })
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'El usuario / password no son correctos - estado: false'
            })
        }

        // validar la contrase;a
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validPassword) {
            return res.status(401).json({
                msg: 'El usuario / password no son correctos - password'
            })
        }

        // Generar JWT
        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })

    } catch (err) {
        console.log(`${err}`.red)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

const googleSingIn = async (req, res = response) => {

    const { id_token } = req.body

    try {
        const { correo, nombre, img } = await googleVerify(id_token)

        let usuario = await User.findOne({ correo })

        console.log("usuario", usuario)

        if (!usuario) {
            //crear usuario
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            }

            usuario = new User(data)
            await usuario.save()
        }

        //Si el usuario en DB  status false
        if (!usuario.estado) {
            return res.status(401).json({
                msg: `Hable con el administrador. Usuario en ${estado}`
            })
        }

        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })
    } catch (error) {
        res.status(400).json({
            msg: `Token de google invalido: ${error.message}}`,

        })
    }
}

module.exports = {
    login,
    googleSingIn
}
