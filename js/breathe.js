$(document).ready(function() {
  $('.toggle').on('click', 'div', function(){
    toggleView(this);
  });

  function toggleView(toggle){
    var view = $(toggle).attr('id');
    $('.container').attr('class', 'container ' + view);
    $('.toggle div').removeClass('active');
    $(toggle).addClass('active');
  }
});
