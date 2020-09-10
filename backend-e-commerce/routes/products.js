var express = require('express');
var router = express.Router();

var models = require('../models/index');

const path = require('path');

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

  let { title, rate, description, price, brand, detailProduct, category, fileId, color, capacities, stock, size } = req.body;
 
  let { file } = req.files;

  let filename = `${fileId}-${file.name}`;

  file.mv(path.join(__dirname, "..", "public", "images", filename), err => {

    if (err) console.log('error file upload:', err);

    else {
      models.Products.create({
        title,
        rate,
        description,
        price,
        brand,
        detail_product: detailProduct,
        category,
        image: [`/images/${filename}`],
        color: color.split(','),
        stock,
        size: size,
        capacities: capacities.split(',')
      })
        .then(product => {
          let result = {
            ...product.dataValues,
            image: server_URL + product.dataValues.image[0]
          }
          console.log('RESULT DI BACKEND >>>', result);
          res.json(result)
        })
        .catch(err => {
          console.log(err)
          res.json({
            error: true,
            message: err
          })
        })
    }
  })
})

//GET Find Product Details by id
router.get('/:id', (req, res) => {

  models.product.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(product => {
      let result = {
        ...product.dataValues,
        image: server_URL + product.dataValues.image[0]
      }
      res.json(result)
    })
    .catch(err => {
      console.log(err);
      res.json({
        error: true,
        message: err
      })
    })
})

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
