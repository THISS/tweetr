/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
function createTweetElement(tweetObj) {
  // will turn tweet obj into a tweet article
  // vars = avatar userName tagname tweet timestamp
  <article id="handlebar-tweet">
    <header class="group">
     <img src={{avatar}} />
     <h2>{{userName}}</h2>
     <h4>{{tagName}}</h4>
    </header>

    <p>{{tweet}}</p>

    <footer class="group">
     <h5>{{timestamp}} days ago</h5>
     <div class="social">
      <img src="/images/icons/flag.png" />
      <img src="/images/icons/share.png" />
      <img src="/images/icons/heart.png" />
     </div>
    </footer>
  </article>



}

function renderTweets(arrayOfTweets) {
  // Takes the arrayOfTweets and appends the tweet element to the tweets-container
  // capture #tweets-container in a jQuery object and assign to variable tweetContainer
  // loop over array
  // create tweet and attach to var tweet
  // append the tweet to tweetContainer
}