$(document).ready(function(){

  // function removeNo() {
  //   setTimeout(function(){ $(document).remove('body', '#no'); }, 2000);
  // }

  $('#button').on('click', function(e) {
    e.preventDefault();
    console.log("got here");
    $(this).remove();
    $('body').append('<h1 id="no">NO</h1>');
    // removeNo();
    $('body').prepend('<div id="remove-button">remove</div>');
  });

  $('body').on('click', '#remove-button', function(e) {
    $(this).remove();
    $('#no').remove();
  })

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
  var positionAlias = [ position[0], position[1] ]

  while (positionAlias[0] < 5 && positionAlias[1] > 0) {
      positionAlias[0]++;
      positionAlias[1]--;
    };
    var collection = [ [ positionAlias[0], positionAlias[1] ] ];
    while (positionAlias[0] > 0 && positionAlias[1] < 6) {
      positionAlias[0]--;
      positionAlias[1]++;
      collection.push([ positionAlias[0], positionAlias[1] ]);
    };

    var values = collection.map(function(loc) {return board[ loc[0] ][ loc[1] ]});
    return values;
  }

var backslash= function(position, board){
  var positionAlias = [ position[0], position[1] ]

  while (positionAlias[0] > 0 && positionAlias[1] > 0) {
      positionAlias[0]--;
      positionAlias[1]--;
    };
    var collection = [ [ positionAlias[0], positionAlias[1] ] ];
    while (positionAlias[0] < 5 && positionAlias[1] < 6) {
      positionAlias[0]++;
      positionAlias[1]++;
      collection.push([ positionAlias[0], positionAlias[1] ]);
    };

    var values = collection.map(function(loc) {return board[ loc[0] ][ loc[1] ]});
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

    var playerId = (turnCounter % 2) + 1;
    var coordinate = b.drop(column, playerId);

    var row = coordinate[0];
    var cols = getCol(b.grid(), coordinate);
    var frontSlash = forwardslash(coordinate, b.grid());
    var notbackslash = backslash(coordinate, b.grid());


    var collection = [cols, b.grid()[row], frontSlash, notbackslash];
    var winner = b.connectFour(collection);

    if(winner === 1) {
      // alert('Cthulhu Wins!!!');
    $('body').prepend('<div id="winner">Cthulhu Wins!!!');
    } else if(winner === 2) {
      $('body').prepend('<div id="winner">Bellatrix Wins!!');
      // alert('Bellatrix Wins!!!!');
    };
  };

});




