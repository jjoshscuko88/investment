import burgerHandler from 'includes/burger.js';
import 'slick-carousel';

// Эти три строки нужны, чтобы библиотеки были доступны вне webpack-сборки.
window.$ = $;
window.jQuery = jQuery;
window._ = _;

document.addEventListener('DOMContentLoaded', function() {
  burgerHandler();

  require('includes/popups');

  $('.multiple-items').slick({
    autoplay: true,
    arrows: false,
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        }
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        }
      }
    ]
  });

  $(window).scroll(function () {
    var head = document.querySelector('.header');
    var tel = document.querySelector('.header__telandquest');

    if ($(this).scrollTop() > 1) {
     head.classList.add('header_scroll');
     tel.classList.add('header__telandquest_scroll');
    }
    else {
      head.classList.remove('header_scroll');
      tel.classList.remove('header__telandquest_scroll');
    }
  });

});

