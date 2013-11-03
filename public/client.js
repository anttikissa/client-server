var player = require('./player');

console.log(_.range(1, 10));

setInterval(function() {
	player.update();
	console.log("Player position is ", player.pos);
}, 500);
alert('this is client!');

