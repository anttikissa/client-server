var _ = require('underscore');
var log = require('basic-log');

var express = require('express');
var engine = require('engine.io');
var http = require('http');

var app = express();
var httpServer = http.createServer(app);
var server = engine.attach(httpServer);

var connections = 0;

var sockets = [];

server.on('connection', function(socket) {
	sockets.push(socket);

	console.log('New connection. Now', ++connections, 'connections.');
	socket.on('message', function(str) {
		try {
			var obj = JSON.parse(str);
			var msg = obj.msg;
			var data = obj.data;
			if (msg && data) {
				log.i('<-', JSON.stringify(msg));
				got(msg, data);
			} else {
				log.i('something strange', msg, data);
			}
		} catch (e) {
			log.w('cannot parse', e, str);
		}
	});
	socket.on('close', function() {
		console.log('Connection closed. Now', --connections, 'connections.');
		sockets = _.without(sockets, [socket]);
	});
});

function send(socket, msg, data) {
	var str = JSON.stringify({
		msg: msg,
		data: data
	});
	log("sending", str);
	socket.send(str);
}

function got(msg, data) {
	for (var i = 0; i < sockets.length; i++) {
		send(sockets[i], msg, data)
	}
}

app.use(express.static(__dirname + '/client'));

var port = process.env.PORT || 3000;
httpServer.listen(port);

console.log('Listening to http://localhost:' + port);

