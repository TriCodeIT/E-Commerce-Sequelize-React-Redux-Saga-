var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors');

const fileUpload = require('express-fileupload');

var app = express();

var productsRouter = require('./routes/products');
var usersRouter = require('./routes/users');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(fileUpload({ limits: { fileSize: 4 * 1024 * 1024 } }))


app.use('/api/product', productsRouter);
app.use('/users', usersRouter);

module.exports = app;
