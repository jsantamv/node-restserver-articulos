/**
 * indice comuno para los controladores
 */

const auth = require('../controllers/auth.controller')
const category = require('../controllers/category.controller')
const product = require('../controllers/product.controller')
const user = require('../controllers/users.controller')
const buscar = require('../controllers/buscar.controller')
const uploads = require('../controllers/uploads.controller')

module.exports = {
    ...auth,
    ...category,
    ...product,
    ...user,
    ...buscar,
    ...uploads
}