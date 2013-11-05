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

	log('New connection. Now', ++connections, 'connections.');
	socket.on('message', function(str) {
		try {
			var obj = JSON.parse(str);
			var msg = obj.msg;
			var data = obj.data;
			if (msg && data) {
				log.i('got', JSON.stringify(msg));
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
		sockets.remove(socket);
	});
});

Array.prototype.remove = function(item) {
	var idx = this.indexOf(item);
	if (idx !== -1)
		this.splice(idx, 1);
	return this;
}

function send(socket, msg, data) {
	var str = JSON.stringify({
		msg: msg,
		data: data
	});
//	log("sending", str);
	socket.send(str);
}

var players = {}

function got(msg, data) {
	if (msg === 'player') {
		players[data.name] = data;
	}
}

function hb() {
	log.d('broadcast');
	for (var name in players) {
		var data = players[name];
		data.age = data.age || 0;
		data.age++;
		for (var i = 0; i < sockets.length; i++) {
			send(sockets[i], 'player', data)
		}

		if (data.age > 3) {
			log('delete player', players[name]);
			delete players[name];
		}
	}
}

setInterval(hb, 1000);

app.use(express.static(__dirname + '/client'));

var port = process.env.PORT || 3000;
httpServer.listen(port);

console.log('Listening to http://localhost:' + port);

