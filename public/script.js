$('.menu-icon').click(() => {
  $('.menu-icon').toggleClass('x');
  $('nav').toggleClass('menu-active');
});

const checkPassword = () => {
  if($('div > input')[2].value != $('div > input')[3].value) {
    $('.input')[2].classList.add('error');
    $('.input')[3].classList.add('error');
    $('.button')[0].disabled = true;
  } else {
    $('.input')[2].classList.remove('error');
    $('.input')[3].classList.remove('error');
    $('.button')[0].disabled = false;
  }
};

const changeUsername = () => {
  const newUsername = prompt('Please enter your new username:');
  if(!newUsername) return;
  // Fetch endpoint with username
}

const autoResize = () => {
  const textarea = document.querySelector('textarea');
  textarea.style.height = 'auto';
  textarea.style.height = (textarea.scrollHeight < 100 ? textarea.scrollHeight : 100) + 'px';
}