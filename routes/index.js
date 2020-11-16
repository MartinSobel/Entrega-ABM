var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tienda JS' });
});

router.get('/create', productController.renderCreate);
router.post('/create', productController.create);

router.get('/edit/:id', productController.renderEdit);
router.post('/edit/:id', productController.edit);

router.get("/delete/:id", productController.delete);

module.exports = router;