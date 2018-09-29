function mousePressed() {
	switch (state) {
		case states.type.DRAWING:
			addRowButton.checkPressed(mouseX, mouseY);
			addColumnButton.checkPressed(mouseX, mouseY);
			removeRowButton.checkPressed(mouseX, mouseY);
			removeColumnButton.checkPressed(mouseX, mouseY);
			addWallsButton.checkPressed(mouseX, mouseY);
			clearButton.checkPressed(mouseX, mouseY);
			drawingModeButton.checkPressed(mouseX, mouseY);
			break;
	}
}

function mouseDragged() {
	switch (state) {
		case states.type.DRAWING:
			mazecreator.changeCellAtPos(mouseX, mouseY);
	}
}