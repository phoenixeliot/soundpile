$.fn.blink = function (options) {
  this.each(function (i, el) {
    $(el).delay(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  });
};
