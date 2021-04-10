const dbValidators = require('../helpers/db-validators')
const generarJWT = require('../helpers/generarjwt')
const googleVerify = require('../helpers/google-verify')
const uploadFile = require('../helpers/uploads-validators')

module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...uploadFile,
}