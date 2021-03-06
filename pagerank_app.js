var express = require('express');
var pagerank = require('google-pagerank');
var fs = require('fs');
var app = express();

app.get('/', function(req, res) {
  serveFile('index.html', res);
});

app.get('/rank', function(req, res) {
  console.log('query', req.query.url);
  pagerank(req.query.url, function(err, rank) {
    if (err) {
      console.log('ERROR', err);
      res.send({success: false});
    } else {
      console.log('rank', rank);
      res.send({success: true, rank: rank});
    }
  });
});

function serveFile(path, res) {
  fs.readFile(path, function (err, data){
    res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
    res.write(data);
    res.end();
  });
}

var server = app.listen(6111, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});
