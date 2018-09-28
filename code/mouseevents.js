function mousePressed() {
	switch (state) {
		case states.type.DRAWING:
			mazecreator.changeCellAtPos(mouseX, mouseY);
			break;
	}
}