$("document").ready(function(){
  const newTweet = $(".new-tweet");
  const counter = newTweet.find(".counter");
  const counterCount = 140;
  counter.text(counterCount);
  newTweet.on("keyup", "textarea", function(){
    const keyCount = $(this).val().length;
    const count = counterCount - keyCount;
    counter.text(count);
    if(count < 0) {
      counter.addClass("warning-text-count");
    }else {
      counter.removeClass("warning-text-count");
    }
  });
  newTweet.find("form").on("submit", function(){
    counter.text(counterCount - newTweet.find("textarea").val().length);
  });
});