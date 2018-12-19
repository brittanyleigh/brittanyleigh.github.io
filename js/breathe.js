$(document).ready(function() {
  $('.toggle div').on('click', function(){
    $('.container').toggleClass('night day');
    $('.toggle div').toggleClass('active');
  })
});
