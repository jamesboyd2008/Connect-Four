

var board = function() {

	var grid = [
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0]
	];
	this.connectFour = function (collections) {
		oneCount = 0
		twoCount = 0
		for (var row = 0; row < collections.length; row++) {
			oneCount = 0
			twoCount = 0
			for (var column = 0; column < collections[row].length; column++) {

				if (collections[row][column] == 1) {
					oneCount++;
				}
				else {
					oneCount = 0;
				}
				if (oneCount == 4) {
					return 1;
				}
				if (collections[row][column] == 2) {
					twoCount++;
				}
				else {
					twoCount = 0;
				}
				//console.log(oneCount);
				if (twoCount == 4) {
					return 2;
				}
			}
			//if (oneCount == 4) {return true;}
		}
		return 0;
	}
	this.drop = function (column, playerId) {
		for (var i = 5; i >= 0; i--) {
			if (grid[i][column] == 0) {
				update(playerId, i, column)
				return [i, column];
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
var forwardslash= function(position, board){

  while (position[0] < 5 && position[1] > 0){
      position[0]++;
      position[1]--;
    };
    var collection = [position];
    var row = position[0];
    var col = position[1];
    while (row > 0 && col<6){
      row--;
      col++;
      collection.push([row, col]);
    };
    var values = collection.map(function(loc) {return board[loc[0]][loc[1]]});
    return values;
  }

var backslash= function(position, board){

  while (position[0] > 0 && position[1] > 0){
      position[0]--;
      position[1]--;
    };
    var collection = [position];
    var row = position[0];
    var col = position[1];
    while (row < 5 && col <6){
      row++;
      col++;
      collection.push([row, col]);
    };
    var values = collection.map(function(loc) {return board[loc[0]][loc[1]]});
    return values;
  }

function getCol(board, loc) {
  var column = [];
  for (var i = 0; i < board.length; i++) {
    column.push(board[i][loc[1]]);
  }
  return column;
}

b = new board();

$(".column").on("click", function(e){


    var column = $(this).attr('id');

 var playerId = (turnCounter % 2)

var coordinate = b.drop(column, playerId);//
var row = coordinate[0];
//console.log('coord')
//console.log(coordinate)
var cols = getCol(b.grid(), coordinate);

var frontSlash = forwardslash(coordinate, b.grid());
var backSlash = backslash(coordinate, b.grid());

var collection = [cols, b.grid()[row], frontSlash, backSlash];

b.connectFour(collection);

  });






// console.log('b.connectFour(collection)');
// console.log(b.connectFour(collection));

//collections = [[1,0,1,0,2,1,1,1,1,0,1,2,2,0],[1,1,1,2,2,1,2],[1,2,1,2,2,1,2,1,2,2,1,1,2,2,2,2],[0,0,0,2,2,1,1,1]]
//collections = [[1,0,1,0,2,1,1,1,1,2,2,0]];


//console.log(b.connectFour(collections));
