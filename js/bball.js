$(document).ready(function() {
  var data, scoreDate, todayString;
  var sfbtoa = 'britika:hYZvU4zN8jxw';
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
    '140': '5',}
  var division_names = {
    '0': 'AL East',
    '1': 'AL Central',
    '2': 'AL West',
    '3': 'NL East',
    '4': 'NL Central',
    '5': 'NL West'}
  var team_strings = {
    '111': 'Baltimore Orioles',
    '112': 'Toronto Blue Jays',
    '113': 'Boston Red Sox',
    '114': 'New York Yankees',
    '115': 'Tampa Bay Rays',
    '116': 'Cleveland Indians',
    '117': 'Detroit Tigers',
    '118': 'Kansas City Royals',
    '119': 'Chicago White Sox',
    '120': 'Minnesota Twins',
    '121': 'Texas Rangers',
    '122': 'Houston Astros',
    '123': 'Seattle Mariners',
    '124': 'Los Angeles Angels',
    '125': 'Oakland Athletics',
    '126': 'Washington Nationals',
    '127': 'New York Mets',
    '128': 'Miami Marlins',
    '129': 'Philadelphia Phillies',
    '130': 'Atlanta Braves',
    '131': 'Chicago Cubs',
    '132': 'Pittsburgh Pirates',
    '133': 'St. Louis Cardinals',
    '134': 'Milwaukee Brewers',
    '135': 'Cincinnatti Reds',
    '136': 'San Francisco Giants',
    '137': 'Los Angeles Dodgers',
    '138': 'Colorado Rockies',
    '139': 'San Diego Padres',
    '140': 'Arizona Diamondbacks',}
  var stats_data;
  var total_games_played, top_three, team_str;

  var url = window.location.href;
  var n = url.indexOf('#');
  if (n !== -1){
    var urlTeamID = url.substr(n+1);
    var url = url.substr(0, n);
    $('#selectTeam').val(urlTeamID.toString()).prop('selected', true);
    //if url for specific team, change selected team
  }

  var windowWidth = $(window).width();
  $(window).resize(function(){
    slickStyles();
    // slick gallery responsive settings reset modified markup
    // re-modify markup on site resize to keep icons etc
  });

  $('#selectTeam').change(function(){
    teamID = $(this).val();
    $('#heading img').attr("src", 'img/' + teamID + '.png');
    $('body').removeClass().addClass('team-' + teamID);
    $('.teams').hide();
    $('.game2').hide();
    $('.double').hide();
    $('.WL h1').removeClass();
    if (checkSeason()){
      todayAjax();
      yesterdayAjax();
      standings(teamID);
      winslosses(teamID);
      getTopPlayerStats(teamID);
    } else {
      $('.games, .standings, #last10, #streak, #home-record, #away-record, .player-stats-heading, .player-stats').hide();
      $('.season-over').show();
    }

    history.pushState(null, '', url + '#' + teamID);
    news();
  });

  function date (){
    var today = new Date();
    var day = daysOfTheWeek[today.getDay()];
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var date = today.getDate();

    var yesterday = new Date(Date.now() - 864e5);
    var yester_year = yesterday.getFullYear();
    var yester_month = yesterday.getMonth() + 1;
    var yester_date = yesterday.getDate();

    if (month < 10) {
      scoreDate = yester_year + '0' + yester_month + yester_date-1;
      todayString = year + '0' + month + date;
      // month is a single digit if jan-sep, api url requires MM format
    } else {
      scoreDate = yester_year.toString() + yester_month + yester_date-1;
      todayString = year.toString() + month + date;
    } 
    var todayDisplay = day + '<br>' + months[month-1] + date + ', ' + year;
    $('#date h2').append(todayDisplay);
  }
  function todayAjax(){
    $('#today').addClass('placeholders');
    $.ajax
    ({
      type: "GET",
      url: 'https://api.mysportsfeeds.com/v1.2/pull/mlb/current/full_game_schedule.json?date=today&team=' + teamID,
      dataType: 'json',
      async: true,
      headers: {
        "Authorization": "Basic " + btoa(sfbtoa)
      },
      success:
      function (data) {
        var dataSched = data.fullgameschedule.gameentry;
        if (dataSched){
          todayGame(dataSched[0], '#today .game');

          if (dataSched[1]){ // checking for doubleheader game
            $('#today .game2').show().css('display', 'flex');
            $('#today .double').show();
            todayGame(dataSched[1], '#today .game2');
          }
        }
        else {
          $('#today .game .time h1').html('Off Day!');
        };
        $('#today').removeClass();
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        $('.error-alert').show();
      }
    }); // ajax call
  };
  function yesterdayAjax(){
    $('#yesterday').addClass('placeholders');
    $.ajax
    ({
      type: "GET",
      url: 'https://api.mysportsfeeds.com/v1.2/pull/mlb/current/scoreboard.json?fordate=' + scoreDate + '&team=' + teamID,
      dataType: 'json',
      async: true,
      headers: {
        "Authorization": "Basic " + btoa(sfbtoa)
      }, //headers
      success: function (data){
        var dataScore = data.scoreboard.gameScore;
        if (dataScore){
          if (dataScore[0].isUnplayed == 'false'){
            yesterdayScore(dataScore[0], '#yesterday .game');
          } else if (dataScore[0].isUnplayed == 'true') {
            $('#yesterday .game .WL h1').html('Postponed!');
          } 
          if (dataScore[1] && dataScore[1].isUnplayed == 'false'){ // checking for doubleheader game
            $('#yesterday .game2').show().css('display', 'flex');
            $('#yesterday .double').show();
            yesterdayScore(dataScore[1], '#yesterday .game2');
          } 
        } else {
          $('#yesterday .game .WL h1').html('Off Day!');
        }
        $('#yesterday').removeClass();
      }, //success
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        $('.error-alert').show();
      }
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
    $(game + ' .time h1').html(time.slice(0, -2) + '<span>' + time.slice(-2) + '</span>');
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
    $(awayDiv).html(awayTeam + ': <b>' + awayScore + '</b>');
    $(homeDiv).html(homeTeam + ': <b>' + homeScore + '</b>');
    if (homeID == teamID && homeScore > awayScore || awayID == teamID && awayScore > homeScore){
      $(game + ' .WL h1').addClass('animated tada').html('W');
    } else{
      $(game + ' .WL h1').html('L');
    } 
  }
  function standings(teamID){
    var param = encodeURIComponent('W,L,GB,Win %');
    $('.standings').addClass('placeholders');
    $.ajax
    ({
      type: "GET",
      url: 'https://api.mysportsfeeds.com/v1.2/pull/mlb/current/division_team_standings.json?teamstats=' + param,
      dataType: 'json',
      async: true,
      headers: {
        "Authorization": "Basic " + btoa(sfbtoa)
      }, //headers
      success: function (data){
        var division_number = divisions[teamID];
        $('.standings h3 span').text(division_names[division_number]);
        var division_standings = data.divisionteamstandings.division[division_number];
        for (var i = 0; i < division_standings.teamentry.length; i++) {
          var team = division_standings.teamentry[i];
          var team_div = $('.standings div .team-' + i);
          $(team_div).find('.rank').text(team.rank);
          $(team_div).find('img').attr('src', 'img/' + team.team.ID + '.png');
          $(team_div).find('.team-name').text(team.team.City + ' ' + team.team.Name);
          $(team_div).find('.team-abbr').text(team.team.Abbreviation);
          $(team_div).find('.wins-losses').text(team.stats.Wins['#text'] + ' - ' + team.stats.Losses['#text']);
          $(team_div).find('.games-back').text(team.stats.GamesBack['#text']);
          $(team_div).find('.win-pct').text(team.stats.WinPct['#text'].substr(1));

          if (team.team.ID == teamID) {
            total_games_played = parseInt(team.stats.Wins['#text']) + parseInt(team.stats.Losses['#text']);
          }
        }
        $('.standings').removeClass('placeholders');
      }, //success
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        $('.error-alert').show();
      }
    }); //ajax call
  }; 
  function winslosses(teamID){
    $.ajax
    ({
      type: "GET",
      url: 'https://api.mysportsfeeds.com/v1.2/pull/mlb/current/team_gamelogs.json?team=' + teamID + '&teamstats=W,L',
      dataType: 'json',
      async: true,
      headers: {
        "Authorization": "Basic " + btoa(sfbtoa)
      }, //headers
      success: function (data){
        var wins = []
        var losses = []
        var last10_wins =0;
        var last10_losses = 0;
        var log = data.teamgamelogs.gamelogs;
        var streak = 1;
        var streakType;
        var streakStr;
        // fetch 15 days to account for off days, sorted by oldest first, so have to go from end of array backwards
        for (var i = log.length -1; i > (log.length - 11); i--) {
          wins.push(log[i].stats.Wins['#text']);
          losses.push(log[i].stats.Losses['#text']);
          last10_wins += parseInt(log[i].stats.Wins['#text']);
          last10_losses += parseInt(log[i].stats.Losses['#text']);
        }
        $('#last10 .stats').text(last10_wins + ' - ' + last10_losses);

        if (wins[0] == 1) {
          streakType = wins;
          streakStr = 'W';
        } else if (losses[0] == 1) {
          streakType = losses;
          streakStr = 'L';
        }
        var i = 0;
        while (streakType[0] == streakType[i+1]){
          streak += 1;
          i++;
        }
        $('#streak .stats').text(streakStr + streak);

        var away_wins = 0;
        var away_losses = 0;
        var home_wins = 0;
        var home_losses = 0;

        for (var i = 0; i < log.length; i++) {
          if (log[i].game.homeTeam.ID == teamID) {
            home_wins += parseInt(log[i].stats.Wins['#text']);
            home_losses += parseInt(log[i].stats.Losses['#text']);
          } else if (log[i].game.awayTeam.ID == teamID) {
            away_wins += parseInt(log[i].stats.Wins['#text']);
            away_losses += parseInt(log[i].stats.Losses['#text']);
          }
        }

        $('#home-record .stats').text(home_wins + ' - ' + home_losses);
        $('#away-record .stats').text(away_wins + ' - ' + away_losses);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        $('.error-alert').show();
      } 
    }); 
  }; 
  function news(){ 
    team_str = team_strings[teamID.toString()];
    $('.team-news .team-name').text(team_str);
    team_search = encodeURIComponent(team_str);
    $.ajax
    ({
      type: "GET",
      url: 'https://newsapi.org/v2/everything?q=' + team_search + '&domains=mlb.com,espn.com,bleacherreport.com&sortBy=publishedAt&pageSize=10',
      dataType: 'json',
      async: true,
      headers: {
        "Authorization": '239b38f74b804d03bd91eba94001f197'
      }, //headers
      success: function (data){
        var articles = data.articles;
        for (var a = 0; a < articles.length; a++){
          if (articles[a].author == 'OddsShark.com') {
            articles.splice(a, 1);
          }
        }
        
        for (var i = 0; i < 7; i++){
          var title = articles[i].title;
          $('.news-' + i + ' .title').text(title);
          $('.news-' + i + ' .source').text('- ' + articles[i].source.name);
          $('.news-' + i + ' img').attr('src', articles[i].urlToImage);
          $('.news-' + i + ' a').attr('href', articles[i].url);
        }
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        $('.error-alert').show();
      }
    }); 
  }; 

  function getTopPlayerStats(teamID){
    $('.player-stats div').addClass('placeholders');
    playerAVG(teamID);
  }
  function playerAVG(teamID){
    $.ajax
    ({
      type: "GET",
      url: 'https://api.mysportsfeeds.com/v1.2/pull/mlb/current/cumulative_player_stats.json?team='+ teamID + '&playerstats=AVG,PA&sort=stats.AVG.D&limit=10',
      dataType: 'json',
      async: true,
      headers: {
        "Authorization": "Basic " + btoa(sfbtoa)
      }, //headers
      success: function (data){
        var avg_stats, top_avg;
        topThreeStats(data, avg_stats, top_avg, 'avg', 'BattingAvg');
        setTimeout(playerHR(teamID), 50);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        $('.error-alert').show();
      }
    });
  };
  function playerHR(teamID){
    $.ajax
    ({
      type: "GET",
      url: 'https://api.mysportsfeeds.com/v1.2/pull/mlb/current/cumulative_player_stats.json?team='+ teamID + '&playerstats=HR,PA&sort=stats.HR.D&limit=10',
      dataType: 'json',
      async: true,
      headers: {
        "Authorization": "Basic " + btoa(sfbtoa)
      }, //headers
      success: function (data){
        var hr_stats, top_hr;
        topThreeStats(data, hr_stats, top_hr, 'hr', 'Homeruns');
        setTimeout(playerRBI(teamID), 50);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        $('.error-alert').show();
      }
    });
  };
  function playerRBI(teamID){
    $.ajax
    ({
      type: "GET",
      url: 'https://api.mysportsfeeds.com/v1.2/pull/mlb/current/cumulative_player_stats.json?team='+ teamID + '&playerstats=RBI,PA&sort=stats.RBI.D&limit=10',
      dataType: 'json',
      async: true,
      headers: {
        "Authorization": "Basic " + btoa(sfbtoa)
      }, //headers
      success: function (data){
        var rbi_stats, top_rbi;
        topThreeStats(data, rbi_stats, top_rbi, 'rbi', 'RunsBattedIn');
        setTimeout(playerOPS(teamID), 50);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        $('.error-alert').show();
      }
    });
  };
  function playerOPS(teamID){
    $.ajax
    ({
      type: "GET",
      url: 'https://api.mysportsfeeds.com/v1.2/pull/mlb/current/cumulative_player_stats.json?team='+ teamID + '&playerstats=OPS,PA&sort=stats.OPS.D&limit=10',
      dataType: 'json',
      async: true,
      headers: {
        "Authorization": "Basic " + btoa(sfbtoa)
      }, //headers
      success: function (data){
        var ops_stats, top_ops;
        topThreeStats(data, ops_stats, top_ops, 'ops', 'BatterOnBasePlusSluggingPct');
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        $('.error-alert').show();
      }
    });
  };
  function topThreeStats(data, stat_var, top_stats_var, stat_id, stat_json){
    var stat_var = data.cumulativeplayerstats.playerstatsentry;
    var qualifying_stats = $.grep(stat_var, function( a ) {
      return (parseInt(a.stats.PlateAppearances['#text']) / total_games_played) >= 3.1;
    });
    var top_stats_var = qualifying_stats.slice(0,3);
    for (var i = 0; i < top_stats_var.length; i++) {
      var p = top_stats_var[i];
      var player_div = $('.player-stats #' + stat_id + ' .player-' + i);
      $(player_div).find('.first-name').text(p.player.FirstName);
      $(player_div).find('.last-name').text(p.player.LastName);
      $(player_div).find('.stat').text(p.stats[stat_json]['#text']);
      $('#' + stat_id).removeClass('placeholders');
    }
  };

  $('.news-carousel').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
    dots: true,
    responsive: [
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        adaptiveHeight: true,
        dots: true,
      }
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        dots: true,
      }
    }
  ]
  });

  function slickStyles(){
    $('.slick-next').insertAfter('.slick-prev');
    $('.slick-prev').html('<i class="fas fa-arrow-left"></i>');
    $('.slick-next').html('<i class="fas fa-arrow-right"></i>');
    $('.slick-dots li button').html('<i class="fas fa-circle"></i>');
  }

  $('.error-alert .close-error').on('click', function(){
    $('.error-alert').fadeOut(250);
  });

  // need to add logic to display playoff games at some point
  function checkSeason(){
    date();
    $.ajax
    ({
      type: "GET",
      url: 'https://api.mysportsfeeds.com/v1.2/pull/mlb/current_season.json?fordate=' + todayString,
      dataType: 'json',
      async: true,
      headers: {
        "Authorization": "Basic " + btoa(sfbtoa)
      }, //headers
      success: function (data){
        if (data.currentseason.season[0].details.intervalType == "regular"){
          return true;
        } else {
          return false;
        }
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        $('.error-alert').show();
      }
    });
  }


  slickStyles();
  $('#selectTeam').triggerHandler('change');
}); //document ready