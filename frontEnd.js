$(document).ready(function(){
  $(".column").hover(function(e){
    $('.hover').remove()
    var columnId = $(this).attr('id');
    var column = $('#' + columnId).children();
    if (turnCounter % 2 === 0){
      $(column[0]).html("<img class='token hover' src='public/images/bellatrix.jpg'>")}
    else
      $(column[0]).html("<img class='token hover' src='public/images/cthulhu_icon.jpg'>")

  });
  $(".column").on("click", function(e){
    // console.log(e)
    $('.hover').remove()
    var columnId = $(this).attr('id');

    var column = $('#' + columnId).children();

    var lastEmpty = ifFull(column);

    if (lastEmpty != undefined)
      appendToken(lastEmpty);
    brains(columnId);
  });


turnCounter = 0

  function findEmpty(column){
    for(i=0; i< column.length; i++){
      if ($(column[i]).attr('class') === "square full"){
        return column[i-1]
      }
    }
    return $(column).last()
  }

  function appendToken(lastEmpty){
    if (turnCounter % 2 === 0)
    $(lastEmpty).append("<img class='token' src='public/images/bellatrix.jpg'>")
    else
    $(lastEmpty).append("<img class='token' src='public/images/cthulhu_icon.jpg'>");

    $(lastEmpty).addClass('full');
    turnCounter += 1
  }

  function ifFull(column){
    if($(column[1]).attr("class")=== "square full")
      alert("Column already full");
    else
      return findEmpty(column)
  }

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


function brains(column) {
console.log(column)

var playerId = (turnCounter % 2)+1
console.log('good')
var coordinate = b.drop(column, playerId);
var coordinate2 = coordinate;


var row = coordinate[0];
var cols = getCol(b.grid(), coordinate);

var frontSlash = forwardslash(coordinate, b.grid());
console.log(coordinate)
var notbackslash = backslash(coordinate, b.grid());
console.log(coordinate)


var collection = [cols, b.grid()[row], frontSlash, notbackslash];

var winner = b.connectFour(collection)
console.log(winner)

if(winner === 1)
  alert('Cthulhu Wins!!!')
else if(winner === 2)
  alert('Belatrix Wins!!!!')

 };

});




