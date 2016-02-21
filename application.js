$(document).ready(function () {








//   $scope.data = {test:'test'}
//
//$scope.width = [1,2,3,4,5,6,7];
//$scope.height = [1,2,3,4,5,6];
//	    0 1 2 3 4 5 6
//	   ----------------
//	0| [0,0,0,0,0,0,0]
//	1| [0,0,0,0,0,0,0]
//	2| [0,0,0,0,0,0,0]
//	3| [0,0,0,0,0,0,0]
//	4| [0,0,0,0,0,0,0]
//	5| [0,0,0,0,0,0,0]
//
//	var player = function(position){
//		this.position = position;
//
//	}



	function check(){

		//position ex. [5,4]
		// needle ex. 1 or 2
		// haystack is entire grid
		this.up = function(position, playerId, grid){
		upperRow = position[0]-1;

			return grid[upperRow][position[1]] == playerId;
		}
		this.down = function(){}
		this.left = function(){}
		this.right = function(){}
	}


	var board = function(){
			var grid = [
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0]
	];
		//var check = new check()
	this.drop = function(column, playerId){
		for(var i = 5; i >=0; i--){
			if(board[i][column] == 0){
				update(playerId, i, column)
			}
		}
	}
		this.grid = function(){
			return grid;
		}

		function update(playerId, row, column){
			grid[row][column] = playerId;
		}

	}


var myBoard = new board()


	myBoard.drop(column, playerId)
	//@TODO : player objects with move method.
	//@TODO : player update function in board.





});