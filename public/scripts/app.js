/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // Get our tweets container
  const tweetContainer = $("#tweets-container");
  const templateHtml = $("#tweet-template").html();

  let templateScript = Handlebars.compile(templateHtml);
  // function to create an individual tweet html
  function createTweetElement(tweetObj) {
    // will turn tweet obj into a tweet article
    // vars = avatar userName tagname tweet timestamp

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

//TODO: remove this test data
  // Fake data taken from tweets.json
  var data = [
    {
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
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "<script>alert('uh oh!');</script>"
      },
      "created_at": 1461113796368
    }
  ];


  renderTweets(data);
});