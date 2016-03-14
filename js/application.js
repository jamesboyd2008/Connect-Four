
var board = [];  //42 piece object will occupy this
//if every position was filled with a red or black piece, there would be about
// 4.4 trillion possible arrangements of pieces.

currentColor = "red";
var Piece = function(color, row, column){
  this.color = color;
  this.row = row;
  this.column = column;
};

//board is from left to right, top to bottom.

var drop = function(col) {
  var piece = new Piece(null, null, null);
  piece.column = col;
  piece.color = currentColor;
  colorSwap();
  var tempColumn = []

  board.forEach( function(piece){
    if(piece.column == col){
      tempColumn.push(piece);
    }
  });
  piece.row = 5 - tempColumn.length
  board.push(piece);
};


var fillBoard = function() {
  for(i = 0; i < 42; i++){
    var newPiece = new Piece(null, null, null);
    board.push(newPiece);
  };
};


fillBoard();

//this is just for tests.
var generateTestBoards = function() {
  var colors = ['red', 'black'];
  allRedBoard = [
                  [],
                  [],
                  [],
                  [],
                  [],
                  []
                ];
  allBlackBoard = [
                    [],
                    [],
                    [],
                    [],
                    [],
                    []
                  ];
  var testBoards = [allRedBoard, allBlackBoard];

  for(i = 0; i < 2; i++) {

    for(j = 0; j < 6; j++) {

      for(k = 0; k < 7; k++) {
        var newPiece = new Piece(colors[i], j, k); //color, row, column
        testBoards[i][j].push(newPiece);
      };
    };
  };

  var r = allRedBoard;
  var b = allBlackBoard;
  stalemateBoard = [
                [b[0][0], r[0][1], b[0][2], b[0][3], b[0][4], r[0][5], b[0][6]],
                [r[1][0], b[1][1], r[1][2], r[1][3], r[1][4], b[1][5], r[1][6]],
                [b[2][0], r[2][1], b[2][2], b[2][3], b[2][4], r[2][5], b[2][6]],
                [r[3][0], b[3][1], r[3][2], r[3][3], r[3][4], b[3][5], r[3][6]],
                [b[4][0], r[4][1], b[4][2], b[4][3], b[4][4], r[4][5], b[4][6]],
                [r[5][0], b[5][1], r[5][2], r[5][3], r[5][4], b[5][5], r[5][6]]
                   ];
  stalemateBoard = [].concat.apply([], stalemateBoard);
  allRedBoard = [].concat.apply([], allRedBoard); //thes two lines flatten the arrays
  allBlackBoard = [].concat.apply([], allBlackBoard);
};

//just for tests
generateTestBoards();

var setRow = function() {

  for (i = 0; i < 42; i++) {
    if (i <= 6) {
      board[i].row = 0;
    } else if (i <= 13) {
      board[i].row = 1;
    } else if (i <= 20) {
      board[i].row = 2;
    } else if (i <= 27) {
      board[i].row = 3;
    } else if (i <= 34) {
      board[i].row = 4;
    } else {
      board[i].row = 5;
    };
  };
};

setRow();

piecePosition = 0;

var setColumn = function() {

  for(i=0; i<6; i++) {
    for(j = 0; j < 7; j++) {
      board[piecePosition].column = j;
      piecePosition++;
    };
  };
};


setColumn();


var colorSwap = function (){
  currentColor = 'black';
};



var checkVertical = function(columnNumber) {
  var columnArray = [];

  for(i=0; i<42; i++) {
    if (board[i].column == columnNumber) {
      columnArray.push(board[i]);
    };
  };

  for (i=0; i<columnArray.length; i++) {
      counter = 0;

    for (j=1; (j + i < columnArray.length && j < 4); j++) {
      if ((columnArray[i].color == columnArray[i + j].color) && columnArray[i].color != null) {
        counter++;
        if (counter == 3) {
          return true;
        };
      } else {
        break;
      };
    };
  };
  return false;
};


var checkHorizontal = function(piece) {
  rowNumber = piece.row;
  var rowArray = [];

  for(i=0; i<42; i++) {
    if (board[i].row == rowNumber) {
      rowArray.push(board[i])
    };
  };

  for (i=0; i<rowArray.length; i++) {
      counter = 0;

    for (j=1; (j + i < rowArray.length && j < 4); j++) {
      if ((rowArray[i].color == rowArray[i + j].color) && rowArray[i].color != null) {
        counter++;
        if (counter == 3) {
          return true;
        };
      } else {
        break;
      };
    };
  };
  return false;
};

//Tests. 'true' four times means our check functions work.
board = allRedBoard;
console.log(checkHorizontal(board[12]) == true);
console.log(checkVertical(3) == true);
board = stalemateBoard;
console.log(checkHorizontal(board[12]) == false);
console.log(checkVertical(3) == false);
console.log(board)
