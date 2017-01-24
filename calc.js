$(document).ready(function() {
  var numbers = [];
  var equation = [];
  var prevAnswer = [0];
  var prevButton = [];
  var percent = [''];
  var percentage = [];
  var value;
  var buttonId;
  var view = $('#display p');

  $('.button').mousedown(function() {
    $(this).css('box-shadow', 'inset 0px 0px 35px 8px #6c6c93, 0px 0px 15px 2px #8b8ba7');
  });
  $('.button').mouseup(function() {
    $(this).css('box-shadow', 'inset 0px 0px 35px 8px #9898b3, 0px 0px 15px 5px #b6b6c8');
  });

  function Number() {
    if (numbers.length >= 32) {
      $(numbers).substr(0, 32);
    } else if (numbers.length === 0 && /0/.test(value)) {} else {
      if (/=/.test(prevButton) || /%/.test(prevButton)) {
        $(view).text('');
        equation = [];
      }
      equation.push(value);
      numbers.push(value);
      var display = numbers.join('');
      $(view).text(display);
    }
  } // number
  function Operators() {
    numbers = [];
    equation.push(value);
    $(view).text(value);
  }

  function Clear() {
    numbers.pop();
    equation.pop();
    $(view).text(numbers.join(''));
    if (numbers.length === 0) {
      $(view).text('0');
    }
  }

  function Return() {
    var display = equation.join('');
    var answer = eval(display);
    $(view).text(answer);
    numbers = [];
    //numbers = answer;
    //numbers.push(answer);
    equation = [];
    equation.push(answer);
    prevAnswer = answer;
  }

  function Percent() {
    if (/[-*+\/]/.test(equation)) {
      var count = numbers.length;
      equation.splice(-count, count); // remove number from equation
      var num = numbers.join('');
      percentage.push(num + '/100'); // turn number into percentage
      var per = eval(percentage.join(''));
      percent.push(per + '*'); // add percentage to percent equation
      if (/\D/.test(equation[equation.length - 1])) { // if last index in equation is not a number
        percent.push(equation.slice(0, equation.length - 1).join(''));
      } // if D test - copy equation minus last index to percent equation

      var e = eval(percent.join(''));
      $(view).text(e)
      equation.push(e);
      percentage = [];
      percent = [''];
    } // if
    else {
      percentage = [];
      percent = [''];
    }; // else
  }

  function Point() {
    if (numbers.indexOf('.') === -1) {
      equation.push(value);
      numbers.push(value);
      var display = numbers.join('');
      $(view).text(display);
    }
  }
  $(document).keyup(function(e) {
    var button = document.getElementsByClassName('button');
    $(button).css('box-shadow', 'inset 0px 0px 35px 8px #9898b3, 0px 0px 15px 5px #b6b6c8');
  });
  $(document).keypress(function(e) {
    var key = e.which;
    value = String.fromCharCode(key);
    if(key===13){
      value = '=';
    };
    var button = document.getElementById(value);
    $(button).css('box-shadow', 'inset 0px 0px 35px 8px #6c6c93, 0px 0px 15px 2px #8b8ba7');
    if (key >= 48 && key <= 57) {
      Number();
    }
    if (key === 42 || key === 43 || key === 45 || key === 47) {
      Operators();
    }
    if (key === 67 || key === 99) {
      Clear();
    }
    if (key === 61 || key === 13) {
      Return();
    }
    if (key === 37) {
      Percent();
    }
    if (key === 46) {
      Point();
    }
  });
  $('.button').on('click', function() {
    value = $(this).text();
    if ($(this).hasClass('number')) {
      Number();
    } // if class number

    if ($(this).hasClass('math')) {
      Operators();

    } // if class math
    if ($(this).hasClass('all-clear')) {
      numbers = [];
      equation = [];
      percent = [];
      $(view).text('0');
    } // if class all-clear
    if ($(this).hasClass('clear-entry')) {
      Clear();
    } // if class clear-entry
    if ($(this).hasClass('return')) {
      Return();
    } // if class return

    if ($(this).hasClass('percentage')) {
      Percent();

    } // if percentage 

    if ($(this).hasClass('answer')) {
      if (/=/.test(prevButton)) {} else {
        equation.push(prevAnswer);
        $(view).text(prevAnswer);
      }
    } // if percentage
    if ($(this).hasClass('point')) {
      Point();
    } // if decimal

  }); // button click

});