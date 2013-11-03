var express = require('express');
var app = express();
var engine = require('engine.io');
var http = require('http');
var httpServer = http.createServer(app);
var server = engine.attach(httpServer);

var connections = 0;

server.on('connection', function (socket) {
	console.log('New connection. Now', ++connections, 'connections.');
	socket.send('hi');
	socket.on('message', function(message) {
		console.log('Got message:', message);
	});
	socket.on('close', function() {
		console.log('Connection closed. Now', --connections, 'connections.');
	});
});

app.use(express.static(__dirname + '/public'));

httpServer.listen(3000);

console.log('Listening to http://localhost:3000');

