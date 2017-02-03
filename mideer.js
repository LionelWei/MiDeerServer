"use strict";

var express = require('express');
var util = require('util');
var hbs  = require('express-handlebars').create({defaultLayout: 'main'});
var bodyParser = require('body-parser');

var app = express();
app.set('port', process.env.PORT || 3000);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());
app.use((req, res, next) => {
  console.log('query test: ' + req.query.test);
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
  next();
});


app.get('/', (req, res) => {
  res.render('home', {data: 'this is extra data'});
});

app.get('/about', (req, res) => {
  res.render('about', {
    data: 'About',
    pageTestScript: '/qa/tests-about.js'});
});

app.get('/headers', (req, res) => {
  var s = '';
  var headers = req.headers;
  var data = [];
  for (var name in headers) {
    s += name + ':' + headers[name] + '\n';
    data.push({'name': name, 'value': headers[name]});
  }
  // res.send(s);
  res.render('headers', {
    items: data
  });
});

app.post('/process', (req, res) => {
  console.log('From (from queryString): ' + req.query.form);
  // console.log('CSRF token (from hidden form field): ' + req.body._csrf);
  console.log('Name (from visible form field): ' + req.body.name);
  console.log('Email (from visible form field): ' + req.body.email);
  res.redirect(303, '/thanks');
});

app.get('/thanks', (req, res) => {
  res.render('thanks');
});

app.use((req, res) => {
  console.log('req: ' + util.inspect(req));
  res.status(404);
  res.render('404');
});

// app.use((err, req, res, next) => {
//   console.error('500 error stack: ');
//   console.error(JSON.stringify(err, null, 2));
//   res.type('text/plain');
//   res.status(500);
//   res.send('500 - Server Error');
// })
//
app.listen(app.get('port'), () => {
  console.log('Express started on http://localhost: ' + app.get('port') + '; press Ctrl-C to terminate');
});
