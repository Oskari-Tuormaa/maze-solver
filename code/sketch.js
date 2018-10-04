var states = {};
var state;

var tiles = {};
var currTile;

var mazecreator;
var drawingMode = 1;

var drawnMaze;

var defaultWidth = 20;
var defaultHeight = 16;

// Button and TextBox initialization:
var addRowButton;
var rowText;
var addColumnButton;
var columnText;
var removeRowButton;
var removeColumnButton;
var addWallsButton;
var clearButton;
var invertButton;
var drawingModeButton;
var tileButton;
var solveButton;
var returnToDrawButton;

function setup() {
	createCanvas(800, 800);

	states.type = new Enum("DRAWING", "SOLVING", "DONE");
	state = states.type.DRAWING;

	tiles.type = new Enum("WALL", "START", "END");
	currTile = tiles.type.WALL;

	mazecreator = new MazeCreator(20, 200, 760, 580, defaultWidth, defaultHeight);

	rowText = new TextBox(20, 60, 100, 40, mazecreator.mazeH, 15);
	columnText = new TextBox(200, 60, 100, 40, mazecreator.mazeW, 15);

	addRowButton = new Button(20, 20, 100, 40, "Add row", 15,
		mazecreator.addRows.bind(mazecreator));
	removeRowButton = new Button(20, 100, 100, 40, "Remove row", 14,
		mazecreator.removeRows.bind(mazecreator));
	addColumnButton = new Button(200, 20, 100, 40, "Add column", 15,
		mazecreator.addColumns.bind(mazecreator));
	removeColumnButton = new Button(200, 100, 100, 40, "Remove column", 11,
		mazecreator.removeColumns.bind(mazecreator));
	addWallsButton = new Button(380, 20, 100, 40, "Add walls", 14,
		mazecreator.addWalls.bind(mazecreator));
	clearButton = new Button(380, 100, 50, 40, "Clear", 13,
		mazecreator.clearMaze.bind(mazecreator));
	invertButton = new Button(430, 100, 50, 40, "Invert", 13,
		mazecreator.invertMaze.bind(mazecreator));
	drawingModeButton = new Button(560, 20, 100, 40, "ADDING", 15,
		switchDrawingMode);
	drawingModeButton.bounds.color = [100, 255, 100];
	tileButton = new Button(560, 100, 100, 40, "WALL", 15,
		nextTile);
	tileButton.bounds.color = [255, 255, 255];
	solveButton = new Button(680, 60, 100, 40, "Solve", 15, startSolving);
	solveButton.bounds.color = [255, 0, 0];
	returnToDrawButton = new Button(20, 20, 150, 40, "Return to start", 15, function() {
		state = states.type.DRAWING;
	});
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

// Maze creation phase.
function drawing() {
	showGUI();
}

// Mase solving phase.
function solving() {
	drawnMaze = mazecreator.saveMaze();
	showGUI();
	drawnMaze.createNodes();
	drawnMaze.initializeNodes();
	drawnMaze.startSearch();
	solvedMaze = drawnMaze.saveMaze();
	solvedMaze.drawPath();
	state = states.type.DONE;
}

// Showing solved maze phase.
function done() {
	showGUI();
}

// Switch the current drawing mode.
function switchDrawingMode() {
	drawingMode = (1 + drawingMode) % 2;
	switch (drawingMode) {
		case 1:
			drawingModeButton.text = "ADDING";
			drawingModeButton.bounds.color = [100, 255, 100];
			break;

		case 0:
			drawingModeButton.text = "REMOVING";
			drawingModeButton.bounds.color = [255, 100, 100];
			break;
	}
}

// Change currTile to next time in enumerator.
function nextTile() {
	switch (currTile) {
		case tiles.type.WALL:
			currTile = tiles.type.START;
			tileButton.text = "START";
			tileButton.bounds.color = [100, 255, 100];
			break;

		case tiles.type.START:
			currTile = tiles.type.END;
			tileButton.text = "END";
			tileButton.bounds.color = [255, 100, 100];
			break;

		case tiles.type.END:
			currTile = tiles.type.WALL;
			tileButton.text = "WALL";
			tileButton.bounds.color = [255, 255, 255];
			break;
	}
}

// Checks if there's only one start and only one end. If true, changes
// state to SOLVING.
function startSolving() {
	var startCount = 0;
	var endCount = 0;
	for (var i = 0; i < mazecreator.data.length; i++) {
		switch (mazecreator.data[i]) {
			case 2:
				startCount++;
				break;

			case 3:
				endCount++;
				break;
		}
	}
	if (startCount == 1 && endCount == 1) {
		state = states.type.SOLVING;
	}
}

// Adding enumerator functionality to javascript.
function Enum() {
	for (var i = 0; i < arguments.length; i++) {
		this[arguments[i]] = i;
	}
	return this;
}
