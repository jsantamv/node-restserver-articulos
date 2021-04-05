/**
 * Path unico para utilizar los modelos
 */

const Category = require('./category')
const User = require('./users')
const Product = require('./product')
const Role = require('./role')
const Server = require('./server')

module.exports = {
    Category,
    Product,
    Role,
    Server,
    User,
}