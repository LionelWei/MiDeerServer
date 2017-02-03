var express = require('express');
var util = require('util');
var hbs  = require('express-handlebars').create({defaultLayout: 'main'});


var app = express();
app.set('port', process.env.PORT || 3000);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home', {data: 'this is extra data'})
})

app.use((req, res) => {
  res.status(404);
  res.render('404');
})

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
})
