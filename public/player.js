var log = require('basic-log');

player = {
	name: 'Bob',
	pos: [0, 0],
	score: 0,
	update: function() {
//		log.d("player pos", this.pos, "random walking"); 
		this.pos[0] += Math.random() - .5;
		this.pos[1] += Math.random() - .5;
//		log.d("player pos", this.pos, "after random walk"); 
	}
};

module.exports = player;
