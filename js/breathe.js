$(document).ready(function() {
  $('.toggle div').on('click', function(){
    toggleDayNight();
  });

  var date = new Date();
  var time = date.getHours();
  if (time >= 7 && time <= 17){
    toggleDayNight();
  }

  function toggleDayNight(){
    $('.container').toggleClass('night day');
    $('.toggle div').toggleClass('active');
  }
});
