/**
 * indice comuno para los controladores
 */

const auth = require('../controllers/auth.controller')
const category = require('../controllers/category.controller')
const product = require('../controllers/product.controller')
const user = require('../controllers/users.controller')

module.exports = {
    ...auth,
    ...category,
    ...product,
    ...user
}