/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// function to create an individual tweet html
function createTweetElement(tweetObj) {
  // will turn tweet obj into a tweet article
  // vars = avatar userName tagname tweet timestamp
  let templateHtml = `<article>
    <header class="group">
     <img src={{avatar}} />
     <h2>{{userName}}</h2>
     <h4>{{tagName}}</h4>
    </header>

    <p>{{tweet}}</p>

    <footer class="group">
     <h5>{{timestamp}}</h5>
     <div class="social">
      <img src="/images/icons/flag.png" />
      <img src="/images/icons/share.png" />
      <img src="/images/icons/heart.png" />
     </div>
    </footer>
  </article>`;

  let templateScript = Handlebars.compile(templateHtml);

  let context = {
    avatar: tweetObj.user.avatars.regular,
    userName: tweetObj.user.name,
    tagName: tweetObj.user.handle,
    tweet: tweetObj.content.text,
    timestamp: moment(tweetObj.created_at).fromNow()
  };

  return templateScript(context);
}

// Test / driver code (temporary). Eventually will get this from the server.
var tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

var $tweet = createTweetElement(tweetData);
$(document).ready(function(){
  $("#tweets-container").append($tweet);
});

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like


// function to turn an array of tweet objects into tweet html
function renderTweets(arrayOfTweets) {
  // Get our tweets container
  const tweetContainer = $("#tweets-container");

  // Takes the arrayOfTweets and appends the tweet element to the tweets-container
  arrayOfTweets.forEach(function(tweetObj){
    const tweet = createTweetElement(tweetObj);
    tweetContainer.append(tweet);
  });
}