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

socket.on('message', function(str) {
	try {
		var obj = JSON.parse(str);
		var msg = obj.msg;
		var data = obj.data;
		if (msg && data) {
//			log.i('<-', JSON.stringify(msg));
			got(msg, data);
		} else {
			log.i('something strange', msg, data);
		}
	} catch (e) {
		log.w('cannot parse', e, str);
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
	var data = _.omit(data, 'age');
	var str = JSON.stringify({
		msg: msg,
		data: data
	});
	socket.send(str);
}

var players = {};

function got(msg, data) {
	log.i("got", msg, data);
	players[data.name] = data;
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
	send('player', player);
	players[player.name] = player;

	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	ctx.globalAlpha = 0.3;
	ctx.globalCompositeOperation = 'darker';

	log("Drawing players", players);
	for (var name in players) {
		var p = players[name];
		player.draw.apply(p);
		p.age = player.age || 0;
		p.age += 0.2
		if (p.age > 5) {
			log('delete player', p);
			delete players[name];
		}
	}

	players = {};
//	log("Player position is", player.pos);
}, 2000);

