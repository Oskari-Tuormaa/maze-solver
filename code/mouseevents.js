function mousePressed() {
	switch (state) {
		case states.type.DRAWING:
			mazecreator.changeCellAtPos(mouseX, mouseY);
			addRowButton.checkPressed(mouseX, mouseY, mazecreator.addRows.bind(mazecreator));
			addColumnButton.checkPressed(mouseX, mouseY, mazecreator.addColumns.bind(mazecreator));
			removeRowButton.checkPressed(mouseX, mouseY, mazecreator.removeRows.bind(mazecreator));
			removeColumnButton.checkPressed(mouseX, mouseY, mazecreator.removeColumns.bind(mazecreator));
			break;
	}
}