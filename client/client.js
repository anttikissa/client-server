var log = require('basic-log');
var player = require('./player');

log(_.range(1, 10));

//
// network
//
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

function send(msg, data) {
	var data = JSON.stringify({
		msg: msg,
		data: data
	});
	socket.send(data);
}

var canvas;
var ctx;
var canvasWidth;
var canvasHeight;
var unitSizePx;

window.onload = function() {
	canvas = document.querySelector('canvas');

	canvasWidth = canvas.width;
	canvasHeight = canvas.height;
	unitSizePx = canvasWidth / 4;
	ctx = canvas.getContext('2d');
}

// convert coordinates to pixels
function coord(relative) {
	// assume width == height
	return .5 * canvasWidth + unitSizePx * relative;
}

// convert coordinates to pixels
function scale(relative) {
	return unitSizePx * relative;
}

// other stuff
//
setInterval(function() {
	player.update();

	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	player.draw();

	send('player', player);

	log("Player position is", player.pos);
}, 1000);

