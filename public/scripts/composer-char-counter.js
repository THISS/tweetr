$("document").ready(function(){
    const counter = $("section.new-tweet .counter");
    const counterCount = +counter.text();
    const textarea = $("section.new-tweet");
  textarea.on("keyup", "textarea", function(){
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