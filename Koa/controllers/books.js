var views = require('co-views');
var parse = require('co-body');
var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost:27017/library');
var co = require('co');

var books = wrap(db.get('books'));

// co(function * () {
//   var books = yield books.find({});
// });

module.exports.home = function * home(next) {
	if ('GET' != this.method) return yield next;
	this.body = 'test';
};

module.exports.all = function * all(next) {
	if ('GET' != this.method) return yield next;
	this.body = yield books.find({});
};

module.exports.fetch = function * fetch(id, next) {
	if ('GET' != this.method) return yield next;
	if (id === ''+parseInt(id, 10)) {
		var book = yield books.find({}, {
			'skip': id - 1,
			'limit': 1
		});
		if (!book.length) {
			this.throw(404, 'book with id = ' + id + ' was not found');
		}
		this.body = book;
	}
};

module.exports.add = function * add(next) {
	if ('POST' != this.method) return yield next;
	var book = {
		name: this.query.name,
		author: this.query.author,
		isbn: this.query.isbn,
		url: this.query.url
	};
	yield books.insert(book);
	this.body = book;
};

module.exports.head = function *() {
	return;
};

