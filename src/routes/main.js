// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

router.get('/', mainController.index); /*listo */
router.get('/search', mainController.search); /*listo */

module.exports = router;
