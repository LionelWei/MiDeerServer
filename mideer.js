var express = require('express');
var util = require('util');

var app = express();
app.set('port', process.env.PORT || 3000);

app.get('/*', (req, res) => {
  let headers = util.inspect(req.headers)
  console.log('headers: ' + headers);
  console.log('params: ' + util.inspect(req.params));
  res.type('text/html')
  res.status(200);
  res.write(headers);
  res.end('<h1>Mideer</h1> <h2>gallery</h2>')
})

app.get('/about', (req, res) => {
  res.type('text/html')
  res.status(200);
  res.send('<h1>Mideer about</h1>')
})

app.use((req, res) => {
  res.type('text/html');
  res.status(404);
  res.send('{"haha": "hello"}');
})

app.use((err, req, res, next) => {
  console.error(err.stacck);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error');
})

app.listen(app.get('port'), () => {
  console.log('Express started on http://localhost: ' + app.get('port') + '; press Ctrl-C to terminate');
})
