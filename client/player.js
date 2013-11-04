var log = require('basic-log');

Array.prototype.random = function() {
	return this[Math.floor(Math.random() * this.length)];
}

var firsts = ['Bob', 'Joe', 'Jill', 'Jack', 'Mary', 'Alice', 'Cecilia', 'William'];
var lasts = ['Smith', 'Wellington', 'Gorgoroth', 'West', 'Spears', 'Johnson', 'Shaw', 'Stein'];

player = {
	name: firsts.random() + ' ' + lasts.random(),
	pos: [0, 0],
	score: 0,
	update: function() {
		this.pos[0] += .2 * (Math.random() - .5);
		this.pos[1] += .2 * (Math.random() - .5);
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
