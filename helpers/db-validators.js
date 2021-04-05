
const {
    User: Usuario,
    Category,
    Role
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

/***
 * valida la si existe la categoria
 * por el id
 */
const existeCategoria = async (id) => {

    const result = await Category.findById(id)

    if (!result) {
        throw new Error(`No existe la categoria con el id ${id}`)
    }
}

module.exports = {
    validRole,
    emailExist,
    userExistById,
    existeCategoria
}
