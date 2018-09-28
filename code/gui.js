class Rectangle {
	constructor(x, y, w, h) {
		this.pos = createVector(x, y);
		this.scale = createVector(w, h);
	}

	// Draw rectangle to canvas
	show() {
		push();
		translate(this.pos.x, this.pos.y);
		fill(255);
		stroke(0);
		strokeWeight(1);
		rect(0, 0, this.scale.x, this.scale.y);
		pop();
	}

	// Returns true if point x, y is inside rectangle.
	// Otherwise returns false
	contains(x, y) {
		var insideX = abs(x - (this.pos.x + this.scale.x / 2.0)) < this.scale.x / 2.0;
		var insideY = abs(y - (this.pos.y + this.scale.y / 2.0)) < this.scale.y / 2.0;
		return insideX && insideY;
	}
}