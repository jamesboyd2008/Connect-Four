// just call drop(), and feed it an integer, representing a column.
// it will return one of three strings:
// "Next Player's Move", "Red Wins!", or "Black Wins!"

board = [];  //42 piece objects will occupy this array.

//if every position was filled with a red or black piece, there would be about
// 4.4 trillion possible arrangements of pieces.

//creates piece objects
var Piece = function(color, row, column){
  this.color = color;
  this.row = row;
  this.column = column;
};

//fills the board with null value pieces
var fillBoard = function() {
  for(i = 0; i < 42; i++){
    var newPiece = new Piece(null, null, null);
    board.push(newPiece);
  };
};

fillBoard();

//gives values to the row properties of each of the 42 elements on the board
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

//gives values to the column properties of each of the 42 elements on the board
var setColumn = function() {
  for(i=0; i<6; i++) {
    for(j = 0; j < 7; j++) {
      board[piecePosition].column = j;
      piecePosition++;
    };
  };
};

setColumn();

currentColor = "red";

//changes the global variable, currentColor
var colorSwap = function (){
  if (currentColor == 'red') {
    currentColor = 'black';
  } else {
    currentColor = 'red';
  }
};

//cheks the column with the given index for a 4-in-a-row
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

// checks the row at the top of the column corresponding to the given index
var checkHorizontal = function(columnIndex) {
  var tempColumn = [];

  board.forEach(function(boardPiece) {
    if(boardPiece.column == columnIndex && boardPiece.color != null){
      tempColumn.push(boardPiece);
    }
  });


  rowNumber = 6 - tempColumn.length;
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

//checks the whole board for a diagonal 4-in-a-row
function checkDiagonal() {
  allDiagonalLanes =  [
    [ board[38], board[32], board[26], board[20] ],
    [ board[37], board[31], board[25], board[19], board[13] ],
    [ board[36], board[30], board[24], board[18], board[12], board[6] ],
    [ board[35], board[29], board[23], board[17], board[11], board[5] ],
    [ board[28], board[22], board[16], board[10], board[4] ],
    [ board[21], board[15], board[9], board[3] ],
    [ board[14], board[22], board[30], board[38] ],
    [ board[7], board[15], board[23], board[31], board[39] ],
    [ board[0], board[8], board[16], board[24], board[32], board[40] ],
    [ board[1], board[9], board[17], board[25], board[33], board[41] ],
    [ board[2], board[10], board[18], board[26], board[34] ],
    [ board[3], board[11], board[19], board[27] ]
  ];

  var matches = 0;

  allDiagonalLanes.forEach(function(pieces) {
    //this loop is not dry.  It's a triplicate.
    for (i = 0; i < pieces.length; i++) {
        counter = 0;

      for (j = 1; (j + i < pieces.length && j < 4); j++) {
        if ((pieces[i].color == pieces[i + j].color) && pieces[i].color != null) {
          counter++;
          if (counter == 3) {
            matches++;//fix this to alter something that gets returned at the end
          };
        } else {
          break;
        };
      };
    };
  });

  if (matches > 0) {
    return true;
  } else {
    return false;
  }
}

//Takes an integer. returns a string. Either "Next Player's Move", "Red Wins", or "Black Wins"
var isGameOver = function(columnIndex) {
  var message = "Next Player's Move";
  var playerWin = [checkHorizontal(columnIndex), checkVertical(columnIndex),
                   checkDiagonal()];

  playerWin.forEach(function(check) {
    if (check == true) {
      if (currentColor == 'red') {
        message = "Red Wins!";
      } else {
        message = "Black Wins!";
      }
    }
  });

  // todo: what if stalemate?
  // todo: change "Next Player's Move" to Blue or Red Player's Move
  colorSwap();
  return message;
}

//board is from left to right, top to bottom.
var drop = function(col) {
  //probably shoul type here: col--;
  var tempColumn = [];

  board.forEach(function(boardPiece) {
    if(boardPiece.column == col && boardPiece.color != null){
      tempColumn.push(boardPiece);
    }
  });

  // todo: what if the column is full?

  var row = 5 - tempColumn.length;

  board.forEach(function(boardPiece) {
    if (boardPiece.row == row && boardPiece.column == col) {
      board[board.indexOf(boardPiece)].color = currentColor;
    }
  });

  return isGameOver(col);
};

// //test zone
// //==============================================================================
// //this is just for tests.
// var generateTestBoards = function() {
//   var colors = ['red', 'black'];
//   allRedBoard = [ [], [], [], [], [], [] ];
//   allBlackBoard = [ [], [], [], [], [], [] ];
//   var testBoards = [allRedBoard, allBlackBoard];
//
//   for(i = 0; i < 2; i++) {
//
//     for(j = 0; j < 6; j++) {
//
//       for(k = 0; k < 7; k++) {
//         var newPiece = new Piece(colors[i], j, k); //color, row, column
//         testBoards[i][j].push(newPiece);
//       };
//     };
//   };
//
//   var r = allRedBoard;
//   var b = allBlackBoard;
//   stalemateBoard = [
//                 [b[0][0], r[0][1], b[0][2], b[0][3], b[0][4], r[0][5], b[0][6]],
//                 [r[1][0], b[1][1], r[1][2], r[1][3], r[1][4], b[1][5], r[1][6]],
//                 [b[2][0], r[2][1], b[2][2], b[2][3], b[2][4], r[2][5], b[2][6]],
//                 [r[3][0], b[3][1], r[3][2], r[3][3], r[3][4], b[3][5], r[3][6]],
//                 [b[4][0], r[4][1], b[4][2], b[4][3], b[4][4], r[4][5], b[4][6]],
//                 [r[5][0], b[5][1], r[5][2], r[5][3], r[5][4], b[5][5], r[5][6]]
//                    ];
//   stalemateBoard = [].concat.apply([], stalemateBoard);
//   allRedBoard = [].concat.apply([], allRedBoard); //thes two lines flatten the arrays
//   allBlackBoard = [].concat.apply([], allBlackBoard);
// };
//
// console.log('=======tests=======')
// generateTestBoards();
// board = allRedBoard;
// console.log(checkHorizontal(5) == true);
// console.log(checkVertical(3) == true);
// board = stalemateBoard;
// console.log(checkHorizontal(board[12]) == false);
// console.log(checkVertical(3) == false);
// var dropTest = function() {
//   board = allBlackBoard;
//   var noColorPiece = new Piece(null, 0, 6);
//   board[6] = noColorPiece;
//   drop(6);
//   return (board[6].color == 'red');
// }
// console.log(dropTest());
// var gameOverTest = function() {
//   if (currentColor == 'black') {
//     currentColor = 'red';
//     return isGameOver(0);
//     currentColor = 'black';
//   } else {
//     return isGameOver(0);
//   }
//   console.log('yeehaw');
// }
// console.log(gameOverTest() == "Red Wins!");
// function testDiagonal() {
//   board = allRedBoard;
//   console.log(checkDiagonal() == true);
//   board = stalemateBoard;
//   console.log(checkDiagonal() == false);
// }
// testDiagonal();
// console.log('=======tests=======')
// //==============================================================================
