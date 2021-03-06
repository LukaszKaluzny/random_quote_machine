var tweetLink = "https://twitter.com/intent/tweet?text=";
var prefix = "https://cors-anywhere.herokuapp.com/";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
// na koncu linku do cytatow podalem 1callback=?
function getQuote() {
    $.getJSON(prefix + quoteUrl, createTweet);
    $.ajaxSetup({ cache: false });
}

function createTweet(input) {
  var data = input[0];

  var quoteText = $(data.content).text().trim();
  var quoteAuthor = data.title;

  if (!quoteAuthor.length) {
    quoteAuthor = "Unknown author";
  }
  var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

  if (tweetText.length > 140) {
    getQuote();
  } else {
    var tweet = tweetLink + encodeURIComponent(tweetText);
    $('.quote').text(quoteText);
    $('.author').text("Author: " + quoteAuthor);
    $('.tweet').attr('href', tweet);
    $('.bubble').fadeIn();
    $('.author').fadeIn();
  }
}


$(document).ready(function() {
  $('.bubble').hide();
  $('.author').hide();
    // getQuote();
    $('.button').click(function() {
      $('.bubble').fadeOut();
      $('.author').fadeOut();
        getQuote();
    });
});