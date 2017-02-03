var express = require('express');
var util = require('util');
var hbs  = require('express-handlebars').create({defaultLayout: 'main'});


var app = express();
app.set('port', process.env.PORT || 3000);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('home')
})

app.use((req, res) => {
  res.type('text/html');
  res.status(404);
  res.send('{"haha": "hello"}');
})

app.use((err, req, res, next) => {
  console.error('500 error stack: ');
  console.error(JSON.stringify(err, null, 2));
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error');
})

app.listen(app.get('port'), () => {
  console.log('Express started on http://localhost: ' + app.get('port') + '; press Ctrl-C to terminate');
})
