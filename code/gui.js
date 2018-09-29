class Rectangle {
	constructor(x, y, w, h) {
		this.pos = createVector(x, y);
		this.scale = createVector(w, h);
		this.color = [255, 255, 255];
	}

	// Draw rectangle to canvas.
	show() {
		push();
		translate(this.pos.x, this.pos.y);
		fill(this.color);
		stroke(0);
		strokeWeight(1);
		rect(0, 0, this.scale.x, this.scale.y);
		pop();
	}

	// Returns true if point x, y is inside rectangle.
	// Otherwise returns false.
	contains(x, y) {
		var insideX = abs(x - (this.pos.x + this.scale.x / 2.0)) < this.scale.x / 2.0;
		var insideY = abs(y - (this.pos.y + this.scale.y / 2.0)) < this.scale.y / 2.0;
		return insideX && insideY;
	}
}

class Button {
	constructor(x, y, w, h, text, textSize, functionCallback) {
		this.bounds = new Rectangle(x, y, w, h);
		this.text = text;
		this.textSize = textSize;
		this.functionCallback = functionCallback;
	}

	// Draws button to canvas
	show() {
		this.bounds.show();
		textSize(this.textSize);
		fill(0);
		text(this.text, this.bounds.pos.x + 10, this.bounds.pos.y + this.bounds.scale.y / 2);
	}

	// Checks bounds contains location x, y. If true, calls
	// function saved in functionCallback.
	checkPressed(x, y) {
		if (this.bounds.contains(x, y)) {
			this.functionCallback(1);
		}
	}
}

class TextBox {
	constructor(x, y, w, h, text, textSize) {
		this.bounds = new Rectangle(x, y, w, h);
		this.text = text;
		this.textSize = textSize;
	}

	// Draws text to canvas
	show() {
		this.bounds.show();
		textSize(this.textSize);
		fill(0);
		text(this.text, this.bounds.pos.x + 10, this.bounds.pos.y + this.bounds.scale.x / 4);
	}
}

function showGUI() {
	switch (state) {
		case states.type.DRAWING:
			mazecreator.drawMaze();
			addRowButton.show();
			addColumnButton.show();
			removeRowButton.show();
			removeColumnButton.show();
			addWallsButton.show();
			clearButton.show();
			invertButton.show();
			drawingModeButton.show();
			tileButton.show();
			rowText.show();
			columnText.show();
			break;
	}
}