'use strict';

$(function () {
  var topBar = $('.top-bar');
  $(window).on('scroll', function () {
    var position = $(window).scrollTop();
    if (position === 0) {
      topBar.addClass('transparent');
    } else {
      topBar.removeClass('transparent');
    }
  });
  $('.scroll').on('click', function () {
    $('body').animate({ scrollTop: $(window).height() - $('.top-bar').height() });
  });
  $('.scroll').on('touchstart', function () {
    $('body').animate({ scrollTop: $(window).height() - $('.top-bar').height() });
  });
});