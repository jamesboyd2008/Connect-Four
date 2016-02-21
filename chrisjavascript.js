

var board = function() {
// [1,0,1,0,2,1,1,1,1,0,0]
	this.connectFour = function (collections) {
			oneCount = 0
			twoCount = 0
		for (var row = 0; row < collections.length; row++) {
			oneCount = 0
			twoCount = 0
			for (var column = 0; column < collections[row].length; column++) {

				if (collections[row][column] == 1) {oneCount++;}
				else {oneCount = 0;}
				if (oneCount == 4) {return 1;}
				if (collections[row][column] == 2) {twoCount++;}
				else {twoCount = 0;}
				console.log(oneCount);
			if (twoCount == 4) {return 2;}
			}
			//if (oneCount == 4) {return true;}
		}
		return 0;
	}

	function board() {
		var grid = [
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0]
		];

		this.drop = function (column, playerId) {
			for (var i = 5; i >= 0; i--) {
				if (grid[i][column] == 0) {
					update(playerId, i, column)
				}
			}
		}
		this.grid = function () {
			return grid;
		}

		function update(playerId, row, column) {
			grid[row][column] = playerId;
		}
	}
}

b = new board();
collections = [[1,0,1,0,2,1,1,1,1,0,1,2,2,0],[1,1,1,2,2,1,2],[1,2,1,2,2,1,2,1,2,2,1,1,2,2,2,2],[0,0,0,2,2,1,1,1]]
//collections = [[1,0,1,0,2,1,1,1,1,2,2,0]];


console.log(b.connectFour(collections));