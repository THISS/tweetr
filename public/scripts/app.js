/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // Get our tweets container
  const tweetContainer = $("#tweets-container");
  const templateHtml = $("#tweet-template").html();
  const newTweet = $(".new-tweet form");
  const newText = newTweet.find("textarea");

  let templateScript = Handlebars.compile(templateHtml);
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
    // Takes the arrayOfTweets and appends the tweet element to the tweets-container
    // arrayOfTweets.forEach(function(tweetObj){
    //   const tweet = createTweetElement(tweetObj);
    //   tweetContainer.append(tweet);
    // });
    tweetContainer.append(arrayOfTweets.map(createTweetElement));
  }

  newTweet.on("submit", function(e){
    e.preventDefault();
    // console.log($(this).serialize());
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $(this).serialize(),
      success: displayTweets,
      error: displayError
    });
  });

  // Display our tweets
  function displayTweets() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      success: renderTweets,
      error: displayError
    });
    newText.val('').focus();
  }
  // Display our Errors
  function displayError(err) {
    const errorDiv = $("<div class='error'></div>")
    errorDiv.text(err.error);
    newTweet.before(errorDiv);
  }

  // Run display tweets on ready
  displayTweets();
});