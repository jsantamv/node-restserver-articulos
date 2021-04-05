
const {
    User: Usuario,
    Category,
    Role,
    Product
} = require("../models")

/**
 * validar si el rol existe en la base de datos
 * o no esta vacio. 
 * @param {Rol} rol a validar
 */
const validRole = async (rol = '') => {
    const rolExist = await Role.findOne({ rol })
    if (!rolExist) {
        throw new Error(`Rol: ${rol} no es valido`)
    }
}


/**
 * Valida si el correo ya existe
 * @param {correo} correo a validar
 */
const emailExist = async (correo = '') => {
    const emailExist = await Usuario.findOne({ correo })
    if (emailExist) {
        throw new Error(`El correo: ${correo} ya existe`)
    }
}


/**
 * Validar si el usuario existe
 * @param {id} id del usuario
 */
const userExistById = async (id = '') => {
    const userExist = await Usuario.findById(id)
    if (!userExist) {
        throw new Error(`El id usuario: ${id} no existe`)
    }
}

/**
 * Valida que exista la categoria por id
 * @param {id} id de la categoria
 */
const existeCategoria = async (id) => {

    const result = await Category.findById(id)

    if (!result) {
        throw new Error(`No existe la categoria con el id ${id}`)
    }
}

/**
 * Validacion del producto por id
 * @param {id} id del producto 
 */
const existeProducto = async (id) => {

    const result = await Product.findById(id)
    console.log(result)
    if (!result) {
        throw new Error(`No existe el producto con el id ${id}`)
    }
}

module.exports = {
    validRole,
    emailExist,
    userExistById,
    existeCategoria,
    existeProducto
}
