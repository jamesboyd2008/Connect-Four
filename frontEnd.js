$(document).ready(function(){
  $(".column").on("click", function(e){
    // console.log(e)
    var columnId = $(this).attr('id')
    console.log(columnId)

    console.log(str)
    $("#" +columnId + ' .square .empty:last-child').append("<div class='token1'></div>");
    // $('.token1').css({bottom: 5, position:'absolute'});
  });



});
