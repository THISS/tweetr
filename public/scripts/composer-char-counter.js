$("document").ready(function(){
  const newTweet = $(".new-tweet");
  const counter = newTweet.find(".counter");
  const textArea = newTweet.find("textarea");
  const counterCount = 140;
  counter.text(counterCount);
  counter.attr("x-data-original-count", counterCount);
  textArea.on("keyup", function(){
    const keyCount = $(this).val().length;
    const count = counterCount - keyCount;
    counter.text(count);
    if(count < 0) {
      counter.addClass("warning-text-count");
    }else {
      counter.removeClass("warning-text-count");
    }
  });
});