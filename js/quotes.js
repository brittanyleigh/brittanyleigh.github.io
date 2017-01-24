$(document).ready(function() {
var quoteList = [{
  quote: "Just where you are - that's the place to start.",
  name: "Pema Chodron"
}, {
  quote: "Put your ear down close to your soul and listen hard.",
  name: "Anne Sexton"
}, {
  quote: "The summit of happiness is reached when a person is ready to be what he is.",
  name: "Desiderius Erasmus"
}, {
  quote: "Always be a first-rate version of yourself, instead of a second-rate version of somebody else.",
  name: "Judy Garland"
}, {
  quote: "When you do things from your soul, you feel a river moving in you, a joy.",
  name: "Rumi"
}, {
  quote: "It isn't where you came from, is where you're going that counts.",
  name: "Ella Fitzgerlad"
}, {
  quote: "Growth itself contains the germ of happiness.",
  name: "Pearl S. Buck"
}, {
  quote: "Everyone has a talent. What's rare is to follow it to the dark places where it leads.",
  name: "Erica Jong"
}, {
  quote: "The weak can never forgive. Forgiveness is the attribute of the strong.",
  name: "Mohandas Gandhi"
}, {
  quote: "Only those who risk going too far can possibly find out how far one can go.",
  name: "T.S. Eliot"
}, {
  quote: "Forgetfulness is a form of freedom.",
  name: "Kahlil Gibran"
}, ];
$('.inspire').click(function() {

  var randomNumber = Math.floor(Math.random() * quoteList.length);
  for (i = 0; i < quoteList.length; i++) {
    var newQuote = quoteList[randomNumber].quote;
    var newAuthor = quoteList[randomNumber].name;
  }
  $('.quote').text(newQuote);
  $('.author').text(newAuthor);
  var newHeight = $('.quote').outerHeight() + $('.author').outerHeight();
  $('#box').outerHeight(newHeight);


   
/*window.open('https://twitter.com/intent/tweet?text=' + twitter)*/
    
  });
 
 $('.tweet').on('click', function tweet(){
   window.open('https://twitter.com/intent/tweet?text=' + $('.quote').text() + ' --' + $('.author').text())

});

}); //main function