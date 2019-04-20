export default function() {
  var burger = document.getElementById('click');
  var nav = document.querySelector('.header__nav-inner');
  // var app = document.querySelector('.app__content');
  var head = document.querySelector('.header');

  burger.addEventListener('change', function() {
    if (burger.checked) {
      nav.classList.add('header__nav-inner_active');
      head.classList.add('header_active');
    } else {
      nav.classList.remove('header__nav-inner_active');
      head.classList.remove('header_active');
    }
  });

  // app.addEventListener('click', function() {
  //   if (nav.classList.contains('header__nav-inner_active')) {
  //     nav.classList.remove('header__nav-inner_active');
  //     head.classList.remove('header_active');
  //   } 
  // });

}

