
const { body } = require('express-validator');

let productsMiddleware = [
    body('name')
        .notEmpty().withMessage('El campo name es obligatorio'),
    body('description')
        .notEmpty().withMessage('El campo de descripción es obligatorio').bail()
        .isLength({ max: 500, min: 5 }).withMessage('El mínimo es 5 y el máximo es 500'),
    body('price')
        .notEmpty().withMessage('Debe completar con un valor numérico').bail()
        .isNumeric().withMessage('El precio debe ser un valor numérico')
]

module.exports = productsMiddleware;