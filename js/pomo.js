$(document).ready(function() {
  var t = 0;
  var work = $('#work');
  $(work).val(25);
  var brk = $('#break');
  $(brk).val(5);
  var time = $(work).val();
  var startTime;
  var playCalled = false;
 
  
  
  
  var running = false;
 timer();

  if (running == false){
    $('#circle').stop();
  }
  
  $('#brk').on('click', function(){
    
    if (playCalled == false){
      $(this).css({"border": "solid 10px #9999e6"});
      $('#wrk').css({"border": "solid 10px #afafcf"});
    time = $(brk).val();
    $('#session').text('Break');
    timer();
    }
    
  });
    $('#wrk').on('click', function(){
      
    if (playCalled == false){
      $(this).css({"border": "solid 10px #9999e6"});
      $('#brk').css({"border": "solid 10px #afafcf"});
    time = $(work).val();
    $('#session').text('Work');
    timer();
    }
      
  });

  $('input').on('click', function(e){
    e.stopPropagation();
  });
  
$('input').on('keydown', function(e){
    var div = $(this).closest('div');
    var divHeader = $(div).find('span');
    var text =$(divHeader).text();
    if (text === $('#session').text() && running){
      return false;
    }
    if (e.which === 190){
      return false;
    }
    
});
$('input').on('input', function(e){
    
    if (this.value.length > this.maxLength) {
      this.value = this.value.slice(0, this.maxLength);}
    
});
  
  $(work).on('input', function(e){
        
        if ($('#session').text() == 'Work'){
      time = $(work).val();
      timer();
  }
  });
 

    $(brk).on('input', function(){
        if ($('#session').text() == 'Break'){
      time = $(brk).val();
      timer();
  }
  });
  timer();

  function timer() {

    var hours = Math.floor(time / 60);
    var minutes = ('0' + (time - (hours * 60)) + ':').slice(-3);
    $('#hours').text(hours + ':');
    $('#minutes').text(minutes);
    $('#seconds').text('00');
    startTime = time;
  }; // changes display timer time

  function toggle() {
    $('.fa-play').toggle();
    $('.fa-pause').toggle();
  }; // toggles play / pause icons

  $('.startStop').on('click', function() {
    if (time === '0'){
      return false;
    }
    else{
    playCalled = true;
    toggle();
    running = !running;
    }
  }); // toggle pause / play icons


  
  $('.fa-play').on('click', function() {
    if (time === '0'){
      return false;
    }
    else {
    playCalled = true;
    var currentDate = new Date();
    var currentTime = currentDate.getTime();

    var milisecWT = time * 60000;

    var endTime = new Date();
    if (t !== 0) {
      endTime.setTime(currentTime + t);
    } // if
    else {
      endTime.setTime(currentTime + milisecWT);
    } // else

    function clock() {
      var timeNow = new Date();
      t = endTime - timeNow;
      var seconds = Math.floor((t / 1000) % 60);
      var minutes = Math.floor((t / 1000 / 60) % 60);
      var hours = Math.floor((t / (1000 * 60 * 60)) % 24);

      $('#hours').text(hours + ':');
      $('#minutes').text(('0' + minutes + ':').slice(-3));
      $('#seconds').text(('0' + seconds).slice(-2));
      if (t <= 999) {
        
        var wav = 'https://notificationsounds.com/soundfiles/ab817c9349cf9c4f6877e1894a1faa00/file-sounds-767-arpeggio.mp3';
      var audio = new Audio(wav);
			audio.play();
        
        clearInterval(go);
        toggle();
        running = false;
        t = 0;
        
        
        if ($('#session').text() == 'Work'){
          $('#brk').css({"border": "solid 10px #9999e6"});
      $('#wrk').css({"border": "solid 10px #afafcf"});
          time = $(brk).val();
          $('#session').text('Break');
          timer();
        }
        else if ($('#session').text() == 'Break'){
          $('#wrk').css({"border": "solid 10px #9999e6"});
      $('#brk').css({"border": "solid 10px #afafcf"});
          time = $(work).val();
          $('#session').text('Work');
          timer();
        }
      } // if 

      $('.fa-pause').on('click', function() {
        clearInterval(go);
        $('#circle').stop();
      }); // pause on click

      $('#reset').on('click', function() {
        if (running) {
          toggle();
        } else {}
        running = false;
        clearInterval(go);
        time = startTime;
        t = 0;
        timer();
        $('#circle').stop();
          bar();
        

      }); // reset on click
      $('#brk').on('click', function() {
        if (running && $('#session').text() == 'Break') {} 
        else {
          $(this).css({"border": "solid 10px #9999e6"});
      $('#wrk').css({"border": "solid 10px #afafcf"});
          clearInterval(go);
          t = 0;
          
          if (running) {
            toggle();
          }
          running = false;
          time = $(brk).val();
          $('#session').text('Break');
          timer();
          $('#circle').stop();
          bar();
        }
      }); // brk on click
      $('#wrk').on('click', function() {
        if (running && $('#session').text() == 'Work') {} else {
          $(this).css({"border": "solid 10px #9999e6"});
      $('#brk').css({"border": "solid 10px #afafcf"});
          clearInterval(go);
          t = 0;
          
          if (running) {
            toggle();
          }
          running = false;
          time = $(work).val();
          $('#session').text('Work');
          timer();
          $('#circle').stop();
          bar();
         
        }
      }); // work on click
      
    
    }
    } // play function clock
    clock();
    var go = setInterval(clock, 1000);

  }); // click play

  $('.fa-angle-down').on('click', function(e) {
    
    var div = $(this).closest('div');
    var divHeader = $(div).find('span');
    var text =$(divHeader).text();
    var input = $(this).siblings('input');
    var inputVal = input.val();
    var newVal = (inputVal - 1);
    if (inputVal <= 1){}
        else{
    if (running == false || text !== $('#session').text()){
    input.val(newVal);
    }
    
    if (text == $('#session').text()){
      if (running){}
      else {
      input.val(newVal);
      time = input.val();
      timer();
      }
    }
        }
e.stopPropagation();
  });
  $('.fa-angle-up').on('click', function(e) {
    var input = $(this).prev('input');
    
    var div = $(this).closest('div');
    var divHeader = $(div).find('span');
    var text =$(divHeader).text();
    
    var inputVal = input.val();
    var newVal = (+inputVal + 1);
    
    if (running == false || text !== $('#session').text()){
    input.val(newVal);
    }
    
    if (text == $('#session').text()){
      if (running){}
      else {
      input.val(newVal);
      time = input.val();
      timer();
      }
    }
   e.stopPropagation();
  });
  
  function bar(){
    $('#circle').css({"margin-left": "-2%", "margin-right": "100%"});
  };
  
  $('.fa-play').on('click', function(){
       $("#circle").animate(
      {marginRight: '-2%',
       marginLeft: '98%'
      },
     { duration: t,
      easing: "linear",
       complete: function() {
         bar();
         
    }
     }
    );
  })

}); // document ready