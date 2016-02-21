var board = function(){

  this.checkUp = function(position) {
    var playerId = this.grid[position[0]][position[1]];
    var upperRow = position[0] - 1;
    if (upperRow < 0) {return false};
    return this.grid[upperRow][position[1]] == playerId;
  }

  this.checkDown = function(position) {
    var playerId = this.grid[position[0]][position[1]];
    var lowerRow = position[0] + 1;
    if (lowerRow > 5) {return false};
    return this.grid[lowerRow][position[1]] == playerId;
  }

  this.checkLeft = function(position) {
    var playerId = this.grid[position[0]][position[1]];
    var leftCol = position[1] - 1;
    if (leftCol < 0) {return false};
    return this.grid[position[0]][leftCol] == playerId;
  }

  this.checkRight = function(position) {
    var playerId = this.grid[position[0]][position[1]];
    var rightCol = position[1] + 1;
    if (rightCol > 6) {return false};
    return this.grid[position[0]][rightCol] == playerId;
  }

}

function getCol(board, loc) {
  var column = [];
  for (var i = 0; i < board.length; i++) {
    column.push(board[i][loc[1]]);
  }
  return column;
}