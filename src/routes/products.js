// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/images/products'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
  var upload = multer({ storage: storage })

// ************ Controller Require ************
const productsController = require('../controllers/productsController');
const productsMiddleware = require('../middlewares/productsMiddleware');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); //listo

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); //listo 
router.post('/create', upload.single('images'), productsMiddleware,  productsController.store);  //listo


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); //listo

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); //listo 
router.put('/edit/:id', productsController.update); //listo 


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); //listo 


module.exports = router;
