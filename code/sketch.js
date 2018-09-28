var states = {};
var state;

var mazecreator;

var defaultWidth = 20;
var defaultHeight = 20;

// Button initialization:
var addRowButton;
var addColumnButton;
var removeRowButton;
var removeColumnButton;

function setup() {
	createCanvas(800, 800);

	states.type = new Enum("DRAWING", "SOLVING", "DONE");
	state = states.type.DRAWING;

	mazecreator = new MazeCreator(20, 200, 760, 580, defaultWidth, defaultHeight);

	addRowButton = new Button(20, 20, 100, 40, "Add row", 15);
	addColumnButton = new Button(200, 20, 100, 40, "Add column", 15);
	removeRowButton = new Button(20, 100, 100, 40, "Remove row", 14);
	removeColumnButton = new Button(200, 100, 100, 40, "Remove column", 11);
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
	addRowButton.show();
	addColumnButton.show();
	removeRowButton.show();
	removeColumnButton.show();
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