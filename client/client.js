var log = require('basic-log');
var player = require('./player');

log(_.range(1, 10));

var socket = new eio.Socket();

socket.on('open', function() {
	socket.on('message', function(data) { log('Got message!', data); });
	socket.on('close', function() { log('Socket closed.') });
});

setInterval(function() {
	player.update();
//	log("Player position is", player.pos);
}, 1000);

