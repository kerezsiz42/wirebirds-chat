$('.menu-icon').click(() => {
  $('.menu-icon').toggleClass('x');
  $('nav').toggleClass('menu-active');
});

const checkPassword = () => {
  if($('div > input')[2].value != $('div > input')[3].value) {
    $('.input')[3].classList.add('error');
  } else {
    $('.input')[3].classList.remove('error');
  }
};
