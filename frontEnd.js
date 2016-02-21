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
  });
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
    $(lastEmpty).append("<img class='token' src='public/images/bellatrix.jpg'>");
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




