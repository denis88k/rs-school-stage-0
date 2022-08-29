const loginBtn = document.querySelector('.login-btn');
const popUp = document.querySelector('.pop-up');
const popUpInner = document.querySelector('.pop-up__inner');

loginBtn.addEventListener('click', () => {
   popUp.classList.add('pop-up-active');
   document.body.classList.add('lock');
});
popUpInner.addEventListener('click', (e) => {
   if (e.target === popUpInner) {
      popUp.classList.remove('pop-up-active');
      document.body.classList.remove('lock');
   }
});

const btnRegister = document.querySelector('.form__btn-register');
const form = document.querySelector('.form');
function register(reg) {
   form.querySelector('.form__title').textContent = reg === 1 ? 'Create account' : 'Log in to your account';
   form.querySelectorAll('.form__btn-account').forEach(el => el.style.display = reg === 1 ? 'none' : 'flex');
   form.querySelectorAll('.form__line')[0].style.display = reg === 1 ? 'none' : 'flex';
   form.querySelector('.form__btn-sign').textContent = reg === 1 ? 'Sign Up' : 'Sign In';
   form.querySelector('.form__btn-forgot').style.display = reg === 1 ? 'none' : 'block';
   form.querySelector('.form__btn-register').innerHTML = reg === 1 ? `Already have an account?<p>Log in</p>` : `Don't have an account?
   <p>Register</p>`;
}
register(0);
btnRegister.addEventListener('click', () => {
   if (btnRegister.classList.contains('register')) {
      register(1);
      btnRegister.classList.remove('register')
   } else {
      register(0);
      btnRegister.classList.add('register')
   }
});

const wrapper = document.querySelector('.wrapper');
const btn = document.querySelector('.menu__btn');
const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');

btn.addEventListener('click', () => {
   btn.classList.toggle('menu__btn-active');
   nav.classList.toggle('nav-active');
   navLinks.classList.toggle('nav__links-active');
   document.body.classList.toggle('lock');
   wrapper.classList.toggle('menu-active');
});

nav.addEventListener('click', () => {
   btn.classList.toggle('menu__btn-active');
   navLinks.classList.toggle('nav__links-active');
   nav.classList.toggle('nav-active');
   document.body.classList.toggle('lock');
   wrapper.classList.toggle('menu-active');
})
