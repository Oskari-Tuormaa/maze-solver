var states = {};
var state;

var mazecreator;

var defaultWidth = 20;
var defaultHeight = 20;

var drawingGrid = [];


function setup() {
	createCanvas(800, 800);

	states.type = new Enum("DRAWING", "SOLVING", "DONE");
	state = states.type.DRAWING;

	mazecreator = new MazeCreator(20, 200, 760, 580, defaultWidth, defaultHeight);
}

function draw() {
	background(51);

	switch (state) {
		case states.type.DRAWING:
			drawing();
			break;

		case states.type.SOLVING:
			solving();
			break;

		case states.type.DONE:
			done();
			break;
	}
}

// Maze creation phase
function drawing() {
	mazecreator.drawMaze();
}

// Mase solving phase
function solving() {

}

// Showing solved maze phase
function done() {

}

// Adding enumerator functionality to javascript
function Enum() {
	for (var i = 0; i < arguments.length; i++) {
		this[arguments[i]] = i;
	}
	return this;
}