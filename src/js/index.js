'use strict';

$(() => {
  const topBar = $('.top-bar');
  $(window).on('scroll', () => {
    const position = $(window).scrollTop();
    if (position === 0) {
      topBar.addClass('transparent');
    } else {
      topBar.removeClass('transparent');
    }
  });
  $('.scroll').on('click', () => {
    $('body').animate({scrollTop: $(window).height() - $('.top-bar').height()})
  });
  $('.scroll').on('touchstart', () => {
    $('body').animate({scrollTop: $(window).height() - $('.top-bar').height()})
  });
});
