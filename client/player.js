var log = require('basic-log');

player = {
	name: 'Bob',
	pos: [0, 0],
	score: 0,
	update: function() {
//		log.d("player pos", this.pos, "random walking");
		this.pos[0] += .2 * (Math.random() - .5);
		this.pos[1] += .2 * (Math.random() - .5);
//		log.d("player pos", this.pos, "after random walk");
	},
	draw: function() {
		var playerSize = 0.5;
		var posXPx = coord(this.pos[0] - .5 * playerSize);
		var posYPx = coord(this.pos[1] - .5 * playerSize);
		var widthPx = scale(playerSize);
		var heightPx = scale(playerSize);
		ctx.fillRect(posXPx, posYPx, widthPx, heightPx);
	}
};

module.exports = player;
