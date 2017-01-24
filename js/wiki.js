$(document).ready(function() {
  $('#search-box').hide();
  $('#search').on('click', function() {
    $('#search').hide();
    $('#search-box').show();
    $('#container').empty();
    document.getElementById("input").value = '';
    $("#input").keyup(function(e) {
      if (e.which === 13) {
        search();
      } // if statement
    }); // input function
    $('#submit').on('click', function() {
      search();
    }); // submit function

    function search() {
      $('#search-box').hide();
      $('#search').show();
      var results = document.getElementById('input').value;
      var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&datatype=json&limit=10&search=' + results + '&callback=?';
      $.getJSON(url, function(data) {
        var titles = data[1];
        var descriptions = data[2];
        var links = data[3];
        var container = document.getElementById("container");
        $('#container').empty();
        for (var i = 0; i < 10; i++) {

          var misc = document.createElement('div');
          misc.className = "box";
          var a = document.createElement('a');
          a.href = links[i];
          a.target = "_blank";
          $(misc).append(a);
          $('#container').append(misc);

          $(misc).append('<h2>' + titles[i] + '</h2>' + descriptions[i]);
          $(misc).on('click', function() {
            window.open($(this).find("a").attr("href"));
          }); // misc on click function

        } //for loop
      }); //jSON function

    }; // search function
    $('#close').on('click', function() {
      $('#search-box').hide();
      $('#search').show();

      document.getElementById("input").value = '';
    }); // close on click function

  }); // search on click function
}); // document ready