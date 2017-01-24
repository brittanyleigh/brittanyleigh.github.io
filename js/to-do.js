$(document).ready(function() {

  $(document).on('click', '.big-do', function() {
    $(this).toggleClass('fa-chevron-down fa-chevron-up');
    var parent = $(this).parents('.to-do');
    var little = $(parent).find('.little-new');
    var completed = $(parent).find('.little-complete');
    $(little).addClass('animated slideInDown').toggle();
    $(completed).addClass('animated slideInDown').toggle();

  }); // big chevron on click

  $(document).on('click', '.comp-icon', function() {
    $(this).toggleClass('fa-chevron-down fa-chevron-up');
    var parent = $(this).parents('.little-complete');
    var done = $(parent).find('.finished');
    $(done).addClass('animated slideInDown').toggle();
    $(parent).append(done);
  }); // little chevron complete on click

  $(document).on('click', '.little-check', function() {
    var par = $(this).parents('.little');

    $(par).addClass('done');
    $(par).removeClass('little-new');
    var prnt = $(par).parents('.to-do');
    var compl = $(prnt).find('.finished');
    $(compl).append(par);
    var check = $(this);
    $(check).remove();
  }); // if little check is clicked

  $(document).on('click', '.big-check', bigCheck);

  // if big check is clicked

  function bigCheck() {

    var par = $(this).parents('.to-do'); // find parent to-do div     

    var checkboxes = par.find('.little-check');
    var checked = par.find('.little-check:checked')
    if ($(checkboxes).length !== $(checked).length) {
      $(this).prop("checked", false);
      checkAlert();
    } else {
      $(par).toggleClass('donezo'); // add donezo class to to-do div    
      var big = $(this).parents('.big'); // find parent big div
      $(big).addClass('big-done'); // add big-done class   
      var little = $(par).find('.little'); // find little divs
      $(little).addClass('little-new');
      var com = $(par).find('.complete'); // find complete div within to-do div
      var chevron = $(big).find('.big-do');
      var done = $(par).find('.finished');
      var d = $(par).find('.done');
      var littleC = $(par).find('.little-complete');
      if ($(com).is(':visible') && $(done).is(':hidden')) {

        $(chevron).toggleClass('fa-chevron-down fa-chevron-up');
        $(littleC).toggle();

      }
      if ($(com).is(':hidden') && $(done).is(':hidden')) {
        $(d).toggle();
        $(done).css('display', 'block');
      }
      if ($(done).length === 0) {
        $(chevron).remove();
      }

      $(com).remove(); // remove complete div (says completed)  
      var inputBox = $(par).find('.little-input'); // find text input in to-do div
      $(inputBox).remove(); // remove div with text input 
      var check = $(this); // checkbox
      $(check).remove(); // remove checkbox
      $('#box').append(par); // add to-do div to bottom of box
    };
  };
  $(document).on('click', '.delete', function() {
    var pare = $(this).parents('.little');
    $('#delete-alert').modal('show');
    $('.fa-times-circle, .nevermind').on('click', function() {
      $('#delete-alert').modal('hide');
    });
    $('.yes').on('click', function() {
      $('#delete-alert').modal('hide');
      $(pare).remove();
    });

  }); // delete

  $(document).on('click', '.delete-big', function() {
    var pare = $(this).parents('.to-do');
    $('#delete-alert').modal('show');
    $('.fa-times-circle, .nevermind').on('click', function() {
      $('#delete-alert').modal('hide');
    });
    $('.yes').on('click', function() {
      $('#delete-alert').modal('hide');
      $(pare).remove();
    });

  }); // delete

  $(document).on('click', '.short-add', add); // add little on click

  function add() {

    var input = $(this).parents('.little');
    var value = $(input).find('input:text');
    var littleText = $(value).val();
    if (littleText === '') {
      blankAlert();
    } else {

      var short = document.createElement('div');
      short.className = 'little little-new';

      var span = document.createElement('span');
      span.className = 'text';
      var toDo = document.createElement('h5');
      var p = value.closest('.to-do');
      var text = ' ' + littleText;
      $(span).append(text);
      var compl = $(p).children('.little-complete');
      var done = $(p).children('.done');
      var del = document.createElement('i');
      del.className = 'fa fa-minus-circle delete';
      var checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.className = 'little-check';
      // checkbox
      $(toDo).append(checkbox).append(span).append(del);

      $(short).append(toDo).toggle();
      $(p).append(short, input, compl, done);
      $(value).val('');
      value.select();
    };
  }; // add little to do
  $(document).on('keyup', '.little-do', function(e) {
    //$('.little-do').keyup(function(e) {
    if (e.which === 13) {

      var input = $(this).parents('.little');
      var value = $(input).find('input:text');
      var littleText = $(value).val();
      if (littleText === '') {
        blankAlert();
      } else {

        var short = document.createElement('div');
        short.className = 'little little-new';

        var span = document.createElement('span');
        span.className = 'text';

        var toDo = document.createElement('h5');
        var p = value.closest('.to-do');
        var text = ' ' + littleText;
        $(span).append(text);
        var compl = $(p).children('.little-complete');
        var done = $(p).children('.done');
        var del = document.createElement('i');
        del.className = 'fa fa-minus-circle delete';
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.className = 'little-check';
        // checkbox
        $(toDo).append(checkbox).append(span).append(del);

        $(short).append(toDo).toggle();
        $(p).append(short, input, compl, done);

        $(value).val('');
        value.select();
      } // if statement
    };
  }); // add little on enter -- NEEDS TO BE FIXED -- add() does not work

  $("#new-big").keyup(function(e) {
    if (e.which === 13) {
      addBig();
    } // if statement
  }); // add big press enter function

  $('.big-add').on('click', function() {
    addBig();
  }); // add big click 

  function addBig() {
    var bigVal = document.getElementById('new-big');
    var bigText = bigVal.value;
    if (bigText === '') {
      blankAlert();
    } else {
      var bigDoDiv = document.createElement('div');
      bigDoDiv.className = 'to-do';

      var bigDiv = document.createElement('div');
      bigDiv.className = 'big';
      var bigTitle = document.createElement('h3');
      var span = document.createElement('span');
      span.className = 'text';
      var titleText = ' ' + bigText;
      $(span).append(titleText);
      var chevron = document.createElement('i');
      chevron.className = 'fa fa-chevron-down big-do';

      var del = document.createElement('i');
      del.className = 'fa fa-minus-circle delete delete-big';

      var bigInput = document.getElementById('big-input');
      var checkBox = document.createElement('input');
      checkBox.type = 'checkbox';
      checkBox.className = 'big-check';
      $(bigTitle).append(del).append(checkBox).append(span).append(chevron);
      $(bigDiv).append(bigTitle);

      var littleDiv = document.createElement('div');
      littleDiv.className = 'little little-new little-input';
      var littleTitle = document.createElement('h5');
      var inputBox = document.createElement('input');
      inputBox.type = 'text';
      inputBox.className = 'new-do little-do';
      inputBox.placeholder = 'New To Do';
      var addIcon = document.createElement('i');
      addIcon.className = 'fa fa-plus-circle short-add';

      var littleC = document.createElement('div');
      littleC.className = 'little-complete';
      var complete = document.createElement('div');
      complete.className = 'complete';
      var finished = document.createElement('div');
      finished.className = 'finished';
      var comH5 = document.createElement('h5');
      var comIcon = document.createElement('i');
      comIcon.className = 'fa fa-chevron-down comp-icon';
      $(comH5).append("Completed").append(comIcon);
      $(complete).append(comH5);
      $(littleC).append(complete).append(finished);

      $(littleTitle).append(inputBox).append(addIcon);
      $(littleDiv).append(littleTitle);

      $(bigDoDiv).append(bigDiv).append(littleDiv).append(littleC);
      $('#box').append(bigDoDiv);
      $('#box').append(bigInput);
      bigVal.value = "";
      bigVal.select();
      var donezo = $('#box').find('.donezo');
      $('#box').append(donezo);
    };
  } // add big to do

  function blankAlert() {
    $('#blank-alert').modal('show');
    $('.fa-times-circle').on('click', function() {
      $('#blank-alert').modal('hide');
    });
  };

  function checkAlert() {
    $('#check-alert').modal('show');
    $('.fa-times-circle').on('click', function() {
      $('#check-alert').modal('hide');
    });
  };

}); // document ready