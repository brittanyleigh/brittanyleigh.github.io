$(document).ready(function() {
  var data;
  var sfbtoa = 'britika:hYZvU4zN8jxw';
  var today = new Date();
  var todayDisplay = today.toDateString();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var date = today.getDate();
  if (month < 10) {
    var scoreDate = year + '0' + month + '' + date-1;
  }
  else {
    var scoreDate = year + '' + month + '' + date-1;
  }
  var teamID = '131';
    $('.teams').hide();
    $('#today.game2').hide();
    $('#yesterday.game2').hide();
  ajax1();
  ajax2();
  

 
  $('#heading h1').append(today.toDateString());

  
  $('#selectTeam').change(function(){
    teamID = $(this).val();
    $('#heading img').attr("src", 'img/' + teamID + '.png');
    ajax1();
    ajax2();
  });



function ajax1(){
$.ajax
({
  type: "GET",
  url: 'https://www.mysportsfeeds.com/api/feed/pull/mlb/current/full_game_schedule.json?date=20170509&team=' + teamID,
  dataType: 'json',
  async: false,
  headers: {
    "Authorization": "Basic " + btoa(sfbtoa)
  },
  //data: formdata,
  success:
  function (data) {
    var dataSched = data.fullgameschedule.gameentry;
    if (dataSched){
      $('#today h2').html('Today\'s Game')
      displayGame (dataSched[0], '#today .game');
    }
    else {
      $('#today .game .time h1').html('Off Day!');
      $('#today .teams').hide();
    };
    if (dataSched[1]){
      $('#today .game2').show();
      $('#today h2').html('Today\'s Games')
      displayGame(dataSched[1], '#today .game2');
    }
    else {
      $('#today .game2').hide();
    }



     

  } // function/success
}); // ajax call
};
// todays game - full schedule API
function displayGame (gameData, game){
    var homeID = gameData.homeTeam.ID;
    var awayID = gameData.awayTeam.ID;
    var homeTeam = gameData.homeTeam.Name;
    var awayTeam = gameData.awayTeam.Name;
    var time = gameData.time;
    var homeColor = teamColor(homeID);
    var awayColor = teamColor(awayID);
    var awayDiv = game + ' .teams .away';
    var homeDiv = ' .teams .home';
    clearBgColor(awayDiv);
    clearBgColor(homeDiv);
    $(game + ' .teams').show();
    $(game + ' .time h1').html(time.slice(0, -2));
    $(awayDiv).html(awayTeam + ' @').addClass(awayColor);
    $(homeDiv).html(homeTeam).addClass(homeColor);    
    }

function ajax2(){    
$.ajax
({
  type: "GET",
  url: 'https://www.mysportsfeeds.com/api/feed/pull/mlb/current/scoreboard.json?fordate=20170509&team=' + teamID,
  dataType: 'json',
  async: false,
  headers: {
    "Authorization": "Basic " + btoa(sfbtoa)
  }, //headers
  //data: '{ "comment" }',
  success: function (data){
    var dataScore = data.scoreboard.gameScore;
    if (dataScore){
      $('#yesterday h2').html('Yesterday\s Score:');
      var homeID = dataScore[0].game.homeTeam.ID;
      var awayID = dataScore[0].game.awayTeam.ID;
      var homeTeam = dataScore[0].game.homeTeam.Name;
      var awayTeam = dataScore[0].game.awayTeam.Name;
      var homeScore = Number(dataScore[0].homeScore);
      var awayScore = Number(dataScore[0].awayScore);
      var homeColor = teamColor(homeID);
      var awayColor = teamColor(awayID);
      var awayDiv = '#yesterday .game .teams .away';
      var homeDiv = '#yesterday .game .teams .home';
        $('#yesterday .game .teams').show();
        clearBgColor(awayDiv);
        clearBgColor(homeDiv);
        $(awayDiv).html(awayTeam + ' : ' + awayScore).addClass(awayColor);
        $(homeDiv).html(homeTeam + ' : ' + homeScore).addClass(homeColor);
        if (homeID == teamID && homeScore > awayScore || awayID == teamID && awayScore > homeScore){
          $('#yesterday .game .WL h1').html('W');
        } // if
        else{
          $('#yesterday .game .WL h1').html('L');
        } // else
      } // if dataScore
      else {
        $('#yesterday .game .WL h1').html('Off Day!');
        $('#yesterday .teams').hide();
      } // else*/
    if (dataScore[1]){
      $('#yesterday .game2').show();
      $('#yesterday h2').html('Yesterday\s Scores:');
      var homeID = dataScore[1].game.homeTeam.ID;
      var awayID = dataScore[1].game.awayTeam.ID;
      var homeTeam = dataScore[1].game.homeTeam.Name;
      var awayTeam = dataScore[1].game.awayTeam.Name;
      var homeScore = Number(dataScore[1].homeScore);
      var awayScore = Number(dataScore[1].awayScore);
      var homeColor = teamColor(homeID);
      var awayColor = teamColor(awayID);
      var awayDiv = '#yesterday .game2 .teams .away';
      var homeDiv = '#yesterday .game2 .teams .home';
        $('#yesterday .game2 .teams').show();
        clearBgColor(awayDiv);
        clearBgColor(homeDiv);
        $(awayDiv).html(awayTeam + ' : ' + awayScore).addClass(awayColor);
        $(homeDiv).html(homeTeam + ' : ' + homeScore).addClass(homeColor);
        if (homeID == teamID && homeScore > awayScore || awayID == teamID && awayScore > homeScore){
          $('#yesterday .game2 .WL h1').html('W');
        } // if
        else{
          $('#yesterday .game2 .WL h1').html('L');
        } // else
      } // if dataScore
          else {
      $('#yesterday .game2').hide();
    }
    } //success
}); //ajax call
} // ajax 2 function

function clearBgColor(teamDiv){
  $(teamDiv).removeClass('red-team blue-team black-team green-team yellow-team orange-team navy-team');
}

// yesterdays score - scoreboard API
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



}); //document ready
