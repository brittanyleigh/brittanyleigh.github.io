$(document).ready(function() {
  var data, scoreDate;
  var sfbtoa = 'britika:hYZvU4zN8jxw';
  var teamID = '131';
  var daysOfTheWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var months = ['Jan. ', 'Feb. ', 'March ', 'April ', 'May ', 'June ', 'July ', 'Aug. ', 'Sep. ', 'Oct. ', 'Nov. ', 'Dec. '];
  var divisions = {
    '111': '0',
    '112': '0',
    '113': '0',
    '114': '0',
    '115': '0',
    '116': '1',
    '117': '1',
    '118': '1',
    '119': '1',
    '120': '1',
    '121': '2',
    '122': '2',
    '123': '2',
    '124': '2',
    '125': '2',
    '126': '3',
    '127': '3',
    '128': '3',
    '129': '3',
    '130': '3',
    '131': '4',
    '132': '4',
    '133': '4',
    '134': '4',
    '135': '4',
    '136': '5',
    '137': '5',
    '138': '5',
    '139': '5',
    '140': '5',
  }
  var division_names = {
    '0': 'AL East',
    '1': 'AL Central',
    '2': 'AL West',
    '3': 'NL East',
    '4': 'NL Central',
    '5': 'NL West'
  }

  $('.teams').hide();
  date();
  todayAjax();
  yesterdayAjax();
  standings(teamID);
  $('#selectTeam').change(function(){
    teamID = $(this).val();
    $('#heading img').attr("src", 'img/' + teamID + '.png');
    $('body').removeClass().addClass('team-' + teamID);
    todayAjax();
    yesterdayAjax();
    standings(teamID);
  });

  function date (){
    var today = new Date();
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    var day = daysOfTheWeek[today.getDay()];
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var date = today.getDate();
    if (month < 10) {
      scoreDate = year + '0' + month + '' + date-1;
    }
    else {
      scoreDate = year + '' + month + '' + date-1;
    } 
    var todayDisplay = day + '<br>' + months[month-1] + date + ', ' + year;
    // month is a single digit if jan-sep, api url requires MM format
    $('#date').append(todayDisplay);
  }
  function todayAjax(){
    $.ajax
    ({
      type: "GET",
      url: 'https://api.mysportsfeeds.com/v1.2/pull/mlb/current/full_game_schedule.json?date=today&team=' + teamID,
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
          todayGame(dataSched[0], '#today .game');
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
      url: 'https://api.mysportsfeeds.com/v1.2/pull/mlb/current/scoreboard.json?fordate=' + scoreDate + '&team=' + teamID,
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
    var awayDiv = game + ' .teams .away h4';
    var homeDiv = game + ' .teams .home h4';
    var awayImg = game + ' .teams .away img';
    $(awayImg).attr("src", 'img/' + awayID + '.png');
    var homeImg = game + ' .teams .home img';
    $(homeImg).attr("src", 'img/' + homeID + '.png');
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
    var awayDiv = game + ' .teams .away h4';
    var homeDiv = game + ' .teams .home h4';
    var awayImg = game + ' .teams .away img';
    $(awayImg).attr("src", 'img/' + awayID + '.png');
    var homeImg = game + ' .teams .home img';
    $(homeImg).attr("src", 'img/' + homeID + '.png');
    $(game + ' .teams').show();
    $(awayDiv).html(awayTeam + ' <b>' + awayScore + '</b>');
    $(homeDiv).html(homeTeam + ' <b>' + homeScore + '</b>');
    if (homeID == teamID && homeScore > awayScore || awayID == teamID && awayScore > homeScore){
      $(game + ' .WL h1').html('W');
      } // if
    else{
      $(game + ' .WL h1').html('L');
    } // else
  }

  function standings(teamID){
    $.ajax
    ({
      type: "GET",
      url: 'https://api.mysportsfeeds.com/v1.2/pull/mlb/current/division_team_standings.json',
      dataType: 'json',
      async: false,
      headers: {
        "Authorization": "Basic " + btoa(sfbtoa)
      }, //headers
      success: function (data){
        console.log(data);
        var division_number = divisions[teamID];
        $('.standings h3 span').text(division_names[division_number]);
        var division_standings = data.divisionteamstandings.division[division_number];
        for (var i = 0; i < division_standings.teamentry.length; i++) {
          var team = division_standings.teamentry[i];
          var team_div = $('.standings div .team-' + i);
          $(team_div).find('.rank').text(team.rank);
          $(team_div).find('img').attr('src', 'img/' + team.team.ID + '.png');
          $(team_div).find('.team-name').text(team.team.City + ' ' + team.team.Name);
          $(team_div).find('.wins-losses').text(team.stats.Wins['#text'] + ' - ' + team.stats.Losses['#text']);
        }
      } //success
    }); //ajax call
  }; 
}); //document ready
