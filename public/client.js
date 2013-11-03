var log = require('basic-log');
var player = require('./player');

log(_.range(1, 10));

setInterval(function() {
	player.update();
	log("Player position is", player.pos);
}, 1000);
alert('this is client!');

