const form = document.querySelector('.login_form');
const input = document.querySelector('.login_input');
const button = document.querySelector('.login_button');

const handleSubmitForm = e => {
  e.preventDefault();

  localStorage.setItem('nick_moamor', input.value);

  window.location = "pages/game.html";
}

const handleInputChange = ({ target }) => {

  const text = target.value;

  if(text.trim().length > 2) {
    button.removeAttribute('disabled');
    return;
  }

  button.setAttribute('disabled', '');

}

form.addEventListener('submit', handleSubmitForm);
input.addEventListener('input', handleInputChange);