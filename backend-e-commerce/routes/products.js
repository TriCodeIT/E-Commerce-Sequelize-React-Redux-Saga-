var express = require('express');
var router = express.Router();

var models = require('../models/index');

const path = require('path');

const server_URL = "http://localhost:3000";


/* GET products listing by Pagination */
router.get('/', function (req, res, next) {

  let page = Number(req.header('page')) || 1;

  let limit = Number(req.header('limit')) || 4;
  
  let offset = (page - 1) * limit;

  models.product.findAndCountAll({
    order: [
      ['createdAt', 'ASC']
    ],
    limit,
    offset
  })
    .then(products => {
      let numOfPages = Math.ceil(products.count / limit);

      let result = products.rows.map(item => ({
        ...item.dataValues,
        image: item.dataValues.image ? server_URL + item.dataValues.image[0] : null
      }))

      res.json({
        numOfPages,
        result
      })
      
    })
    .catch(err => {
      res.json({
        error: true,
        message: err
      })
    })
});



// POST Add Products
router.post('/', (req, res) => {

  let { 
    title, 
    rate, 
    description, 
    price, 
    brand, 
    detailProduct, 
    category, 
    fileId, 
    color, 
    capacities, 
    stock, 
    size 
  } = req.body;
 
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
          console.log('RESULT ON BACKEND >>>', result);
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


//UPDATE Products by id, when someone buy it
router.put('/:id', (req, res) => {
  
  models.product.findOne({
    where: { id: req.params.id }
  })
    .then(product => {
      console.log('product', product)
      if (product.dataValues.testimonials === null) {
        product.dataValues.testimonials = [];
      }

      let newTestimonials = [
        ...product.dataValues.testimonials, req.body
      ]

      models.product.update({ testimonials: newTestimonials }, {
        where: {
          id: req.params.id
        }
      })
        .then(product => res.json(product))
        .catch(err => res.json(err))
    })
    .catch(err => {
      console.log(err);
      res.json({
        error: true,
        message: err
      })
    })
})


module.exports = router;
