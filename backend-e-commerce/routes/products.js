var express = require('express');
var router = express.Router();

var models = require('../models/index');

/* GET products listing. */
router.get('/', function (req, res, next) {
  models.product.findAll({
  }).then((products) => {
    res.json(products);
  }).catch((err) => {
    res.json(err)
  })
})


module.exports = router;
