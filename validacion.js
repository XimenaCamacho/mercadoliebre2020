//Despues de instalar el paquete se requiere en la ruta donde sera utilizado para validar lo que deseamos.

let {check, validationResult, body} = require('express-validator'); 
const fs = require('fs');

// Luego se escribe el middleware en la ruta que se quiere utilizar
// Se pone entre [] la lista de tareas que queremos verificar con express-validator
//La lista de tareas corresponde a los nombres de los atributos de las etiquedas donde ingresa la info.
//Pueden colocarse varios middleware en una ruta.
//mas info de las propiedades .isXxxx en pagina de express-validator.
router.post ('ruta', middlewareX, [
    check('username').isLength().withMessage('lo que se debe completar'),
    check('email').isEmail().withMessage('lo que se debe completar'),
    check('password').isLength({min: 10}).withMessage('lo que se debe completar'),
    check('age').isInt({min: 0}).withMessage('lo que se debe completar'),
    //validacion personalizada (que no se repita el mail en DB)
    body('email').custom(function(value) {
        let archivoJSON = fs.readFileSync('archivo.json', {encoding: 'utf-8'});
        let archivos = JSON.parse(archivoJSON);
        for (let i=0; i<archivos.length; i++) {
            if (archivos[i].email == value) {
                return false;
            }
        }
        return true;
    }).withMessage('email ya existente')
], userController.store);

//Para implementar la logica, se debe llevar al controller el require completo y comenzar el codigo.
let test =
{store: function (req, res) {
    let errors = validationResult(req);

    if (errors.isEmpty()) { 
        //toda la logica de login-registro-carga-modificacion...

    } else { //devuelve la vista necesaria
        return res.render('registro', {errors: errors.errors})
    };
}
}

// En la vista se debe aplicar la logica para mostrar los errores

if (typeof errors != 'undefined') {
    //mostrar lo deseado
    // <p> mensaje de error</p>
    //<ul>
    for (let i=0; i<errors.length; i++) {
        //<li>
        errors[i].msg;
        //</li>

    }
    //</ul>
}

