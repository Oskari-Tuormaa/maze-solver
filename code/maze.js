class Maze {
	constructor(mazeW, mazeH, data) {
		this.mazeW = mazeW;
		this.mazeH = mazeH;
		this.data = data;
		this.nodes = {};
		this.startNode = {};
		this.endNode = {};
		this.openSet = [];
		this.closedSet = [];
		this.path = [];
	}

	// Draws maze to canvas at position x, y with width w and height h
	show(x, y, w, h) {
		var cellWidth = w / this.mazeW;
		var cellHeight = h / this.mazeH;

		push();
		translate(x, y);
		fill(0);
		stroke(0);
		rect(-10, -10, w + 20, h + 20);
		for (var i = 0; i < this.data.length; i++) {
			var cell = this.data[i];
			stroke(0);
			switch (cell) {
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
				case 4:
					fill(100, 100, 100);
					break;
				case 5:
					fill(100, 100, 255);
					break;
			}

			var posX = (i % this.mazeW) * cellWidth;
			var posY = floor(i / this.mazeW) * cellHeight;
			rect(posX, posY, cellWidth, cellHeight);
		}
		pop();
	}

	// Makes all white(0) tiles into nodes. Makes the green(2) tile start
	// and the red(3) tile end.
	createNodes() {
		for (var i = 0; i < this.data.length; i++) {
			switch (this.data[i]) {
				case 0:
					this.nodes[i] = {
						"index": i,
						"tile": "node",
						"distance": NaN,
						"neighbors": [],
						"cameFrom": NaN,
						"gScore": Infinity
					};
					break;
				case 2:
					this.startNode = this.nodes[i] = {
						"index": i,
						"tile": "start",
						"distance": NaN,
						"neighbors": [],
						"gScore": 0
					};
					this.openSet.push(this.startNode);
					break;
				case 3:
					this.endNode = this.nodes[i] = {
						"index": i,
						"tile": "end",
						"distance": NaN,
						"neighbors": [],
						"cameFrom": NaN,
						"gScore": Infinity
					};
					break;
			}
		}
	}

	// Initialize node data -> add neighbor nodes and calculate
	// euclidian distance from each node to end node.
	initializeNodes() {
		var indexX;
		var indexY;

		for (var i in this.nodes) {
			var index = this.nodes[i]["index"];

			indexX = (index + 1) % this.mazeW;
			indexY = floor(index / this.mazeW);
			var checkingNode = this.nodes[indexX + indexY * this.mazeW];
			if (checkingNode != undefined) {
				this.nodes[index].neighbors.push(checkingNode);
			}
			indexX = (index - 1) % this.mazeW;
			indexY = floor(index / this.mazeW);
			var checkingNode = this.nodes[indexX + indexY * this.mazeW];
			if (checkingNode != undefined) {
				this.nodes[index].neighbors.push(checkingNode);
			}
			indexX = index % this.mazeW;
			indexY = (floor(index / this.mazeW) + 1) % this.mazeH;
			var checkingNode = this.nodes[indexX + indexY * this.mazeW];
			if (checkingNode != undefined) {
				this.nodes[index].neighbors.push(checkingNode);
			}
			indexX = index % this.mazeW;
			indexY = (this.mazeH + floor(index / this.mazeW) - 1) % this.mazeH;
			var checkingNode = this.nodes[indexX + indexY * this.mazeW];
			if (checkingNode != undefined) {
				this.nodes[index].neighbors.push(checkingNode);
			}

			var posX = index % this.mazeW;
			var posY = floor(index / this.mazeW);
			var endPosX = this.endNode["index"] % this.mazeW;
			var endPosY = floor(this.endNode["index"] / this.mazeW);

			this.nodes[i]["distance"] = dist(posX, posY, endPosX, endPosY);


		}
	}

	// Begin A* search to find best route from start to finish.
	startSearch() {
		while (this.openSet.length > 0) {
			// If next node up for processing is end node, the best route has
			// been found. Terminate program and calculate route.
			if (this.findNextNode() == this.endNode) {
				this.populatePath();
				return;
			}

			// Find next node to process.
			var next = this.findNextNode();

			// Remove next from openSet and add it to closedSet.
			this.removeFromOpenSet(next);
			this.closedSet.push(next);

			// Calculate gScore for each neighbor and move to openSet.
			for (var node in next["neighbors"]) {
				this.processNeighbor(next, next["neighbors"][node]);
			}
		}

		for (var node in this.closedSet) {
			node = this.closedSet[node];
			if (node != this.startNode) {
				this.data[node["index"]] = 5;
			}
		}
	}

	// Returns next node to process. The next node is determined by
	// summing the gScore and the euclidian distance.
	findNextNode() {
		var best = this.openSet[0];
		for (var node in this.openSet) {
			node = this.openSet[node];
			if (node["gScore"] + node["distance"] < best["gScore"] + best["distance"]) {
				best = node;
			}
		}
		return best;
	}

	// Does processing to neighbor value.
	processNeighbor(me, neighbor) {

		// If neighbor is already in closedSet ignore node.
		if (this.closedSetContains(neighbor)) {
			return;
		}

		// If openSet does not contain neighbor, we've discovered a
		// new node. Add this node to openSet.
		if (!this.openSetContains(neighbor)) {
			this.openSet.push(neighbor);
		}

		// If the potential gScore through me is lower than the current
		// gScore of neighbor, change the gScore of neighbor and add
		// me as the previous node to neighbor.
		if (me["gScore"] + 1 + me["distance"] < neighbor["gScore"] + neighbor["distance"]) {
			neighbor["gScore"] = me["gScore"] + 1;
			neighbor["cameFrom"] = me;
		}
	}

	// Returns true if closedSet contains node n.
	closedSetContains(n) {
		var doesContain = false;
		for (var node in this.closedSet) {
			if (n == this.closedSet[node]) {
				doesContain = true;
			}
		}
		return doesContain;
	}

	// Returns true if openSet contains node n.
	openSetContains(n) {
		var doesContain = false;
		for (var node in this.openSet) {
			if (n == this.openSet[node]) {
				doesContain = true;
			}
		}
		return doesContain;
	}

	// Removes node n from open set.
	removeFromOpenSet(n) {
		for (var i = 0; i < this.openSet.length; i++) {
			if (this.openSet[i] == n) {
				this.openSet.splice(i, 1);
				return;
			}
		}
	}

	// Goes from endNode through each cameFrom until it reaches
	// startNode and adds each node to path.
	populatePath() {
		var reachedStart = false;
		var currNode = this.endNode["cameFrom"]["index"];
		while (!reachedStart) {
			this.path.push(this.nodes[currNode]);
			currNode = this.nodes[currNode]["cameFrom"]["index"];
			if (currNode == this.startNode["index"]) {
				reachedStart = true;
			}
		}
	}

	// Draws path onto data.
	drawPath() {
		for (var node in this.path) {
			node = this.path[node];
			if (node != this.startNode && node != this.endNode) {
				this.data[node["index"]] = 4;
			}
		}
	}

	// Returns Maze object loaded with maze specificaitions and data.
	saveMaze() {
		var newMaze = new Maze(this.mazeW, this.mazeH, this.data.slice());
		newMaze.path = this.path.slice();
		newMaze.nodes = this.nodes;
		return newMaze;
	}
}
