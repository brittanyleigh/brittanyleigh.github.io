$(document).ready(function() {
  var data, scoreDate;
  var sfbtoa = 'britika:hYZvU4zN8jxw';
  var teamID = '131';
  $('.teams').hide();
  date();
  todayAjax();
  yesterdayAjax();
  $('#selectTeam').change(function(){
    teamID = $(this).val();
    $('#heading img').attr("src", 'img/' + teamID + '.png');
    todayAjax();
    yesterdayAjax();
  });

  function date (){
    var today = new Date();
    var todayDisplay = today.toDateString();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var date = today.getDate();
    if (month < 10) {
      scoreDate = year + '0' + month + '' + date-1;
    }
    else {
      scoreDate = year + '' + month + '' + date-1;
    } 
    // month is a single digit if jan-sep, api url requires MM format
    $('#heading h1').append(today.toDateString());
  }
  function todayAjax(){
    $.ajax
    ({
      type: "GET",
      url: 'https://www.mysportsfeeds.com/api/feed/pull/mlb/current/full_game_schedule.json?date=today&team=' + teamID,
      dataType: 'json',
      async: false,
      headers: {
        "Authorization": "Basic " + btoa(sfbtoa)
      },
      success:
      function (data) {
        var dataSched = data.fullgameschedule.gameentry;
        if (dataSched){
          $('#today h2').html('Today\'s Game') // h2 is changed to plural for doubleheaders, this ensures it changes back to singular
          todayGame (dataSched[0], '#today .game');
        }
        else {
          $('#today .game .time h1').html('Off Day!');
          $('#today .teams').hide();
          $('#today .game2').hide();
        };
        if (dataSched[1]){ // checking for doubleheader game
          $('#today .game2').show();
          $('#today h2').html('Today\'s Games')
          todayGame(dataSched[1], '#today .game2');
        }
        else {
          $('#today .game2').hide();
        }
      } // function/success
    }); // ajax call
  };
  function yesterdayAjax(){
    $.ajax
    ({
      type: "GET",
      url: 'https://www.mysportsfeeds.com/api/feed/pull/mlb/current/scoreboard.json?fordate=' + scoreDate + '&team=' + teamID,
      dataType: 'json',
      async: false,
      headers: {
        "Authorization": "Basic " + btoa(sfbtoa)
      }, //headers
      success: function (data){
        var dataScore = data.scoreboard.gameScore;
        if (dataScore){
          $('#yesterday h2').html('Yesterday\s Score'); // ensures h2 is singular if changed to plural for doubleheader previously
          yesterdayScore(dataScore[0], '#yesterday .game');
          } 
          else {
            $('#yesterday .game .WL h1').html('Off Day!');
            $('#yesterday .teams').hide();
            $('#yesterday .game2').hide();
          } 
          if (dataScore[1]){ // checking for doubleheader game
            $('#yesterday .game2').show();
            $('#yesterday h2').html('Yesterday\s Scores');
            yesterdayScore(dataScore[1], '#yesterday .game2');
          } 
          else {
            $('#yesterday .game2').hide();
          }
      } //success
    }); //ajax call
  }; 
  function todayGame (gameData, game){
    var homeID = gameData.homeTeam.ID;
    var awayID = gameData.awayTeam.ID;
    var homeTeam = gameData.homeTeam.Name;
    var awayTeam = gameData.awayTeam.Name;
    var time = gameData.time;
    var homeColor = teamColor(homeID);
    var awayColor = teamColor(awayID);
    var awayDiv = game + ' .teams .away';
    var homeDiv = game + ' .teams .home';
    changeBgColor(awayDiv, awayColor);
    changeBgColor(homeDiv, homeColor);
    $(game + ' .teams').show();
    $(game + ' .time h1').html(time.slice(0, -2));
    $(awayDiv).html(awayTeam + ' @');
    $(homeDiv).html(homeTeam);    
  }
  function yesterdayScore(gameData, game){
    var homeID = gameData.game.homeTeam.ID;
    var awayID = gameData.game.awayTeam.ID;
    var homeTeam = gameData.game.homeTeam.Name;
    var awayTeam = gameData.game.awayTeam.Name;
    var homeScore = Number(gameData.homeScore);
    var awayScore = Number(gameData.awayScore);
    var homeColor = teamColor(homeID);
    var awayColor = teamColor(awayID);
    var awayDiv = game + ' .teams .away';
    var homeDiv = game + ' .teams .home';
    $(game + ' .teams').show();
    changeBgColor(awayDiv, awayColor);
    changeBgColor(homeDiv, homeColor);
    $(awayDiv).html(awayTeam + ' : ' + awayScore);
    $(homeDiv).html(homeTeam + ' : ' + homeScore);
    if (homeID == teamID && homeScore > awayScore || awayID == teamID && awayScore > homeScore){
      $(game + ' .WL h1').html('W');
      } // if
    else{
      $(game + ' .WL h1').html('L');
    } // else
  }
  function teamColor(id) {
    var teamColorClass;
    if (id == 140 || id == 130 || id == 113 || id == 135 || id == 116 || id == 124 || id == 129 || id == 133 || id == 126 ){
      return 'red-team';
    }
    else if (id == 111 || id == 122 || id == 128 || id == 136){
      return 'orange-team';
    }
    else if (id == 119 || id == 138 || id == 114){
      return 'black-team';
    }
    else if (id == 117 || id == 134 || id == 120 || id == 127 || id == 139 || id == 123 || id == 115 || id == 121){
      return 'navy-team';
    }
    else if (id == 131 || id == 118 || id == 137 || id == 112){
      return 'blue-team';
    }
    else if (id == 125){
      return 'green-team';
    }
    else if (id == 132){
      return 'yellow-team';
    }
  }
  function changeBgColor(teamDiv, newColor){
    $(teamDiv).removeClass('red-team blue-team black-team green-team yellow-team orange-team navy-team');
    $(teamDiv).addClass(newColor);
  }
}); //document ready
