var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));


//APIs
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:7000/bookshop')

var Books = require('./models/books');

//--------->>> Post Books <<<------
app.post('/books', function(req, res){
  var book = req.body;
  Books.insertMany(book, function(err, books){
    if (err){
      console.log('===error while entering data====='); 
      throw err;

    }
    res.json(books);
  })
});

//----->>> Get Books <<<------
app.get('/books', function(req, res){
  Books.find(function(err, books){
    if (err){
      throw err;
    }
    res.json(books);
  })
});

//-------->>> Delete Books <<<------
app.delete('/books/:_id', function(req, res){
  var query = {_id: req.params._id};
  Books.remove(query, function(err, books){
    if (err){
      throw err;
    }
    res.json(books);
  })
})

//------->>> Update Books <<<-------
app.put('/books/:_id', function(req, res){
  var book = req.body;
  var query = req.params._id;
  //if the field doesn't exist $set will set a new field
  var update = {
    '$set':{
      title: book.title,
      description: book.description,
      images: book.image,
      price: book.price
    }
  };
  var options = {new: true};
  Books.update({'_id': query}, update, function(err, books){
    if (err){
      throw err;
    }
    res.json(books);
  })
});
//END APIs

app.listen(3001, function(err){
    if (err){
        return console.log(err);
    }
    console.log('API Server is listening on http://localhost:3001');
})