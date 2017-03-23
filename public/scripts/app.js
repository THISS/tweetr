/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // Get our tweets container
  const tweetContainer = $("#tweets-container");
  const templateHtml = $("#tweet-template").html();
  const newTweetContainer = $(".new-tweet");
  const newTweet = newTweetContainer.find("form");
  const newText = newTweet.find("textarea");
  const errorDiv = $("<div class='error-div'></div>");
  const error = $("<ul></ul>").appendTo(errorDiv);
  newTweet.before(errorDiv);
  const templateScript = Handlebars.compile(templateHtml);

  // function to create an individual tweet html
  function createTweetElement(tweetObj) {
    // will turn tweet obj into a tweet article
    let context = {
      avatar: tweetObj.user.avatars.regular,
      userName: tweetObj.user.name,
      tagName: tweetObj.user.handle,
      tweet: tweetObj.content.text,
      timestamp: moment(tweetObj.created_at).fromNow()
    };

    return templateScript(context);
  }

  // function to turn an array of tweet objects into tweet html
  function renderTweets(arrayOfTweets) {
    /*Takes the arrayOfTweets and appends the tweet element to the tweets-container
    arrayOfTweets.forEach(function(tweetObj){
      const tweet = createTweetElement(tweetObj);
      tweetContainer.append(tweet);
    });*/
    tweetContainer.html(arrayOfTweets.map(createTweetElement));
  }

  newTweet.on("submit", function(e){
    e.preventDefault();
    if(checkFormDataIntegrity($(this))) {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize()
      })
      .done(function(data){
        loadTweets();
        newText.val('').focus();
      })
      .fail(function(err) {
        newText.val('').focus();
        displayError(err.error);
      });
    }else {
      errorDiv.addClass("error");
    }
  });


  // Check the Form Data integrity
  function checkFormDataIntegrity(form) {
    errorDiv.removeClass("error");
    error.empty();
    if(!form.find("textarea").val().length) {
      error.append("<li>You must enter a Tweet before submitting.</li>");
    }
    if(Number(form.find(".counter").text()) < 0) {
      error.append("<li>Your Tweet is too long.</li>");
    }
    // if our error has an li child return false
    return !error.has("li").length;
  }

  // Display our tweets
  function loadTweets() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      success: function(data){
        const newest = data.reverse();
        renderTweets(newest);
      },
      error: displayError
    });
  }

  // Display our Errors
  function displayError(err) {
    error.empty();
    $("li").text(err.error).appendTo(error);
    errorDiv.addClass("error");
  }

  // button toggle for composing a tweet
  $("#nav-bar button").on("click", function() {
    newTweetContainer.slideToggle();
    newText.focus();
  });

  // Run display tweets on ready
  loadTweets();
});