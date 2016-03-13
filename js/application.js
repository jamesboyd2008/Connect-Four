var board = []  //42 piece object will occupy this
currentColor = "red";

var Piece = function(){
  this.color = null;
  this.row = null;
  this.column = null;
};

var fillBoard = function() {
  for(i = 0; i < 42; i++){
    var newPiece = new Piece();
    board.push(newPiece);
  };
};

fillBoard();

var setRow = function() {

  for (i = 0; i < 42; i++) {
    if (i <= 6) {
      board[i].row = 0;
    }
    else if (i <= 13) {
      board[i].row = 1;
    }
    else if (i <= 20) {
      board[i].row = 2;
    }
    else if (i <= 27) {
      board[i].row = 3;
    }
    else if (i <= 34) {
      board[i].row = 4;
    }
    else{
      board[i].row = 5;
    }
  }
}

setRow();

piecePosition = 0

var setColumn = function() {
  for(i=0; i<6; i++) {
    for(j = 0; j < 7; j++) {
      board[piecePosition].column = j;
      piecePosition++;
    }

  }
}

setColumn();


var colorSwap = function (){
  currentColor = 'black';
}


var checkVertical = function(columnNumber) {
  var columnArray = []

  for(i=0; i<42; i++) {
    if (board[i].column == columnNumber) {
      columnArray.push(board[i])
    }
  }

  for (i=0; i<columnArray.length; i++) {
      counter = 0

      for (j=1; (j + i < columnArray.length && j < 4); j++) {
        if ((columnArray[i].color == columnArray[i + j].color) && columnArray[i].color != null) {
          counter++
          if (counter == 3) {
            return true;
          }
        } else {
          break;
        }
      }
    }
    return false;
}
