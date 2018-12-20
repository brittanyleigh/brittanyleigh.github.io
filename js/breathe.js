$(document).ready(function() {
  $(document).on('click', '.toggle .inactive', function(){
    toggleDayNight();
  });

  var date = new Date();
  var time = date.getHours();
  if (time >= 7 && time <= 17){
    toggleDayNight();
  }

  function toggleDayNight(){
    $('.container').toggleClass('night day');
    $('.toggle div').toggleClass('inactive active');
  }
});
