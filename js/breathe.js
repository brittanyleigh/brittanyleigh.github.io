$(document).ready(function() {
  $('.toggle li').on('click', function(){
    toggleView(this);
    console.log('Click Toggle');
  });

  function toggleView(toggle){
    var view = $(toggle).attr('id');
    $('.container').attr('class', 'container ' + view);
    $('.toggle li').removeClass('active');
    $(toggle).addClass('active');
  }
});
