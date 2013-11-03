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

function drawPlayer() {
	var playerSize = 0.5;
	var posX = player.pos[0] * unitSizePx + canvasWidth / 2;
	var posY = player.pos[1] * unitSizePx + canvasHeight / 2;
	var widthPx = unitSizePx * playerSize;
	var heightPx = unitSizePx * playerSize;
	ctx.fillRect(posX, posY, widthPx, heightPx);
}

//
// other stuff
//
setInterval(function() {
	player.update();
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	drawPlayer();
	log("Player position is", player.pos);
}, 1000);

