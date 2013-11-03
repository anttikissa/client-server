var log = require('basic-log');
var player = require('./player');

log(_.range(1, 10));

var socket = new eio.Socket();

socket.on('error', function(err) {
	connected = false;
});

var connected = false;

setInterval(function() {
	if (connected === false) {
		console.log("connection closed. trying to reopen...");
		socket.open();
	}
}, 1000);

socket.on('message', function(data) {
	log('Got message:', data);
	if (data == 'hi') {
		socket.send('newuser');
	}
});

socket.on('close', function() {
	connected = false;
	log('Socket closed. Trying again soon.')
});

socket.on('open', function() {
	connected = true;
});

setInterval(function() {
	player.update();
	log("Player position is", player.pos);
}, 1000);

