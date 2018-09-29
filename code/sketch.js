var states = {};
var state;

var mazecreator;

var defaultWidth = 20;
var defaultHeight = 20;

// Button initialization:
var addRowButton;
var rowText;
var addColumnButton;
var columnText;
var removeRowButton;
var removeColumnButton;
var addWallsButton;
var clearButton;

function setup() {
	createCanvas(800, 800);

	states.type = new Enum("DRAWING", "SOLVING", "DONE");
	state = states.type.DRAWING;

	mazecreator = new MazeCreator(20, 200, 760, 580, defaultWidth, defaultHeight);

	rowText = new TextBox(20, 60, 100, 40, mazecreator.mazeW, 15);
	columnText = new TextBox(200, 60, 100, 40, mazecreator.mazeH, 15);

	addRowButton = new Button(20, 20, 100, 40, "Add row", 15,
		mazecreator.addRows.bind(mazecreator));
	addColumnButton = new Button(200, 20, 100, 40, "Add column", 15,
		mazecreator.addColumns.bind(mazecreator));
	removeRowButton = new Button(20, 100, 100, 40, "Remove row", 14,
		mazecreator.removeRows.bind(mazecreator));
	removeColumnButton = new Button(200, 100, 100, 40, "Remove column", 11,
		mazecreator.removeColumns.bind(mazecreator));
	addWallsButton = new Button(380, 20, 100, 40, "Add walls", 14,
		mazecreator.addWalls.bind(mazecreator));
	clearButton = new Button(380, 100, 100, 40, "Clear", 15,
		mazecreator.clearMaze.bind(mazecreator));
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
	showGUI();
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