var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors({exposedHeaders: ['Sniffy-Sql-Queries', 'Sniffy-Request-Details', 'Sniffy-Time-To-First-Byte']}));
//app.use(cors());

var counter = 1000;

app.get('/mock/ajax.json', function (req, res) {
  res.header('Sniffy-Sql-Queries' , 2 );
  res.header('Sniffy-Time-To-First-Byte' , 21 );
  //res.header('Sniffy-Request-Id' , 'a54b32e7-b94b-450b-b145-0cf62270d32a' );
  res.header('Sniffy-Request-Details' , 'request/a54b32e7-b94b-450b-b145-0cf62270d32a' );
  res.send('{"foo":"bar","baz":42}');
});

app.get('/mock/path/subpath/ajax.json', function (req, res) {
  res.header('Sniffy-Sql-Queries' , 2 );
  res.header('Sniffy-Time-To-First-Byte' , 21 );
  //res.header('Sniffy-Request-Id' , 'a54b32e7-b94b-450b-b145-0cf62270d32a' );
  res.header('Sniffy-Request-Details' , '../../request/a54b32e7-b94b-450b-b145-0cf62270d32a' );
  res.send('{"foo":"bar","baz":42}');
});

app.get('/mock/notrailingslash', function (req, res) {
  res.header('Sniffy-Sql-Queries' , 2 );
  res.header('Sniffy-Time-To-First-Byte' , 21 );
  //res.header('Sniffy-Request-Id' , 'a54b32e7-b94b-450b-b145-0cf62270d32a' );
  res.header('Sniffy-Request-Details' , './request/a54b32e7-b94b-450b-b145-0cf62270d32a' );
  res.send('{"foo":"bar","baz":42}');
});

app.get('/mock/204.json', function (req, res) {
  res.header('Sniffy-Sql-Queries' , 1 );
  res.header('Sniffy-Time-To-First-Byte' , 21 );
  //res.header('Sniffy-Request-Id' , 'a54b32e7-b94b-450b-b145-0cf62270d32a' );
  res.header('Sniffy-Request-Details' , 'request/b43a32e7-b94b-450b-b145-0cf62270d32a' );
  res.send('{"foo":"bar","baz":42}');
});

app.get('/mock/connectionregistry/', function (req, res) {
  res.status(200);
  res.header('Content-Type','application/json');
  res.send('{"persistent":true,"sockets":[{"host":"en.wikipedia.org","port":"443","status":"OPEN"},{"host":"192.168.99.100","port":"3306","status":"CLOSED"}]' 
    + ',"dataSources":[{"url":"jdbc:h2:mem:/something:","userName":"sa","status":"OPEN"}]'
    + '}');
});

app.post('/mock/connectionregistry/socket/*', function (req, res) {
  res.status(201);
  res.send();
});
app.post('/mock/connectionregistry/datasource/*', function (req, res) {
  res.status(201);
  res.send();
});
app.post('/mock/connectionregistry/persistent/', function (req, res) {
  res.status(201);
  res.send();
});

app.delete('/mock/connectionregistry/socket/*', function (req, res) {
  res.status(201);
  res.send();
});
app.delete('/mock/connectionregistry/datasource/*', function (req, res) {
  res.status(201);
  res.send();
});
app.delete('/mock/connectionregistry/persistent/', function (req, res) {
  res.status(201);
  res.send();
});

app.use('/mock', express.static('mock'));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

var server2 = app.listen(3001, function () {
  var host = server2.address().address;
  var port = server2.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});