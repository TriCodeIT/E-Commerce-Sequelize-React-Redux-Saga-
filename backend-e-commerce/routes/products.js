var express = require('express');
var router = express.Router();

var models = require('../models/index');

const path = require('path');
const product = require('../models/product');
const server_URL = "http://localhost:3000";

/* GET products listing. */
router.get('/', function (req, res, next) {
  models.product.findAll({
  })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.json(err)
    })
})

// POST Add Products
router.post('/', (req, res) => {

  let { title, rate, description, price, brand, detailProduct, category, image, color, capacities, stock, size } = req.body;

  models.product.create({
    title,
    rate,
    description,
    price,
    brand,
    detail_product: detailProduct,
    category,
    image,
    color: color.split(','),
    stock,
    size: size,
    capacities: capacities.split(',')
  })
    .then(function (product) {
      res.json(product);
    })
    .catch((err) => {
      res.status(500).json(err)
    })
})

//GET Find Product Details by id
router.get('/:id', function (req, res) {
  models.product.findByPk(req.params.id)
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      res.status(500).json(err)
    })
});

//DELETE Products by id
router.delete('/:id', function (req, res) {
  models.product.destroy({
    returning: true,
    where: {
      id: req.params.id
    }
  }).then((product) => {
    res.json(product);
  }).catch((err) => {
    res.status(500).json(err)
  })
});

//UPDATE Products by id
router.put('/:id', function (req, res) {
  models.product.update({
    title: req.body.title,
    testimonials : req.body.testimonials
  }, {
    returning: true,
    where: {
        id: req.params.id
    }
  }).then((todo) => {
    res.json(todo);
  }).catch((err) => {
    res.status(500).json(err)
  })
});


module.exports = router;
