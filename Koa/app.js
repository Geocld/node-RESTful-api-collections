var books = require('./controllers/books');
var koa = require('koa');
var path = require('path');
var compress = require('koa-compress');
var logger = require('koa-logger');
var serve = require('koa-static');
var route = require('koa-route');

var app = koa();

app.use(route.get('/', books.home));
app.use(route.get('/books', books.all));
app.use(route.get('/books/:id', books.fetch));
app.use(route.post('/addBook', books.add));

app.listen(8080);
console.log('app is running on port 8080');