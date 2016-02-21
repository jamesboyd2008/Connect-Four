$(document).ready(function(){
  $(".column").hover(function(e){
    $('.hover').remove()
    var columnId = $(this).attr('id');
    var column = $('#' + columnId).children();
    if (turnCounter % 2 === 0){
      $(column[0]).html('<div class="token1 hover"></div>')}
    else
      $(column[0]).html('<div class="token2 hover"></div>')

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
    $(lastEmpty).append('<div class="token1"></div>');
  else
    $(lastEmpty).append('<div class="token2"></div>');

    $(lastEmpty).addClass('full');
    turnCounter += 1
  }

  function ifFull(column){
    if($(column[1]).attr("class")=== "square full")
      alert("Column already full");
    else
      return findEmpty(column)
  }




