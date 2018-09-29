class MazeCreator {
	constructor(posX, posY, w, h, defaultW, defaultH) {
		this.bounds = new Rectangle(posX, posY, w, h);
		this.mazeW = defaultW;
		this.mazeH = defaultH;
		this.data = [];

		for (var i = 0; i < defaultW * defaultH; i++) {
			this.data[i] = 0;
		}
	}

	// Draw maze to canvas.
	drawMaze() {
		push();
		var cellWidth = this.bounds.scale.x / this.mazeW;
		var cellHeight = this.bounds.scale.y / this.mazeH;

		translate(this.bounds.pos.x, this.bounds.pos.y);
		fill(0);
		rect(-10, -10, this.bounds.scale.x + 20, this.bounds.scale.y + 20);
		for (var i = 0; i < this.data.length; i++) {
			push();
			var posX = i % this.mazeW * cellWidth;
			var posY = floor(i / this.mazeW) * cellHeight;
			translate(posX, posY);
			stroke(0);
			switch (this.data[i]) {
				case 0:
					fill(255);
					break;
				case 1:
					fill(0);
					stroke(255);
					break;
				case 2:
					fill(100, 255, 100);
					break;
				case 3:
					fill(255, 100, 100);
					break;
			}
			rect(0, 0, cellWidth, cellHeight);
			pop();
		}
		pop();
	}

	// Resizes maze to fit new parameters.
	resizeMaze(newW, newH) {
		switch (newW > this.mazeW) {
			case true:
				this.addRows(newW - this.mazeW);
				break;

			case false:
				this.removeRows(this.mazeW - newW);
				break;
		}

		switch (newH > this.mazeH) {
			case true:
				this.addColumns(newH - this.mazeH);
				break;

			case false:
				this.removeColumns(this.mazeH - newH);
				break;
		}
	}

	// Adds n rows to maze.
	addRows(n) {
		for (var i = 0; i < n; i++) {
			this.mazeW++;
			for (var j = 0; j < this.mazeH; j++) {
				this.data.splice((j + 1) * this.mazeW - 1, 0, 0);
			}
			rowText.text++;
		}
	}

	// Removes n rows from maze.
	removeRows(n) {
		for (var i = 0; i < n && this.mazeW != 1; i++) {

			for (var j = 0; j < this.mazeH; j++) {
				this.data.splice((this.mazeW - 1) * (j + 1), 1);
			}
			this.mazeW--;
			rowText.text--;
		}
	}

	// Adds n columns to maze.
	addColumns(n) {
		for (var i = 0; i < n; i++) {
			for (var j = 0; j < this.mazeW; j++) {
				this.data.push(0);
			}
			this.mazeH++;
			columnText.text++;
		}
	}

	// Removes n columns from maze.
	removeColumns(n) {
		for (var i = 0; i < n && this.mazeH != 1; i++) {
			for (var j = 0; j < this.mazeW; j++) {
				this.data.pop();
			}
			this.mazeH--;
			columnText.text--;
		}
	}

	// Checks if location x, y is within mazecreator bounds. If true, changes
	// the value of the cell at location x, y to value of currTile.
	changeCellAtPos(x, y) {
		if (!this.bounds.contains(x, y)) {
			return;
		}

		var localX = x - this.bounds.pos.x;
		var localY = y - this.bounds.pos.y;
		var cellWidth = this.bounds.scale.x / this.mazeW;
		var cellHeight = this.bounds.scale.y / this.mazeH;

		var indexX = floor(localX / cellWidth);
		var indexY = floor(localY / cellHeight);

		if (drawingMode) {
			this.data[indexX + indexY * this.mazeW] = currTile + 1;
		} else {
			this.data[indexX + indexY * this.mazeW] = 0;
		}
	}

	// Adds walls to maze.
	addWalls() {
		this.data.fill(1, 0, this.mazeW);
		this.data.fill(1, -this.mazeW);

		for (var i = 1; i < this.mazeH - 1; i++) {
			this.data[i * this.mazeW] = 1;
			this.data[this.mazeW - 1 + i * this.mazeW] = 1;
		}
	}

	// Deletes all walls in maze -> Set all data to 0.
	clearMaze() {
		for (var i = 0; i < this.data.length; i++) {
			this.data[i] = 0;
		}
	}

	// Inverts maze walls to open spaces and open spaces to wall. Does not
	// change start or end tiles.
	invertMaze() {
		for (var i = 0; i < this.data.length; i++) {
			if (this.data[i] > 1) {
				continue;
			}
			this.data[i] = (1 + this.data[i]) % 2;
		}
	}

	// Returns Maze object loaded with maze specificaitions and data.
	saveMaze() {
		return new Maze(this.mazeW, this.mazeH, this.data.slice());
	}
}