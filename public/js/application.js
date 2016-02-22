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









