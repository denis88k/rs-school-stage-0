const loginBtn = document.querySelectorAll('.btn-login');
const popUp = document.querySelector('.pop-up');
const popUpInner = document.querySelector('.pop-up__inner');

loginBtn.forEach(el => {
   el.addEventListener('click', () => {
      popUp.classList.add('pop-up-active');
      document.body.classList.add('lock');
      btn.classList.remove('menu__btn-active');
      nav.classList.remove('nav-active');
      navLinks.classList.remove('nav__links-active');
      wrapper.classList.remove('menu-active');
      console.log('loginBtn')
   });
});

popUpInner.addEventListener('click', (e) => {
   if (e.target === popUpInner) {
      popUp.classList.remove('pop-up-active');
      document.body.classList.remove('lock');
   }
   console.log('popUpInner')
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
   console.log('btn')
});

nav.addEventListener('click', (e) => {
   console.log(e.target)
   if (e.target.parentNode.classList.contains('nav')) {
      btn.classList.remove('menu__btn-active');
      nav.classList.remove('nav-active');
      navLinks.classList.remove('nav__links-active');
      document.body.classList.remove('lock');
      wrapper.classList.remove('menu-active');
      console.log('nav')
   }
});

//слайдер - крутилка - вертелка - карусель
const slideItem = document.querySelectorAll('.slider-item');
const slideItemLength = slideItem.length;
const sliderContainer = document.querySelector('.slider-container');
const sliderTrack = document.querySelector('.slider-track');
const sliderWidth = sliderContainer.clientWidth;
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const dots = document.querySelector('.slider-dots');

let index = 0;
let position = 0;

for (let i = 0; i < slideItem.length; i++) {
   slideItem[i].setAttribute('data-numb', i)
};
//dots создание точек для навигации
for (let i = 0; i < slideItemLength; i++) {
   const dot = document.createElement('div')
   dot.className = 'slider-dot';
   dots.append(dot);
};

const move = (position, jump) => {
   sliderTrack.style.cssText = `
      transition: ${jump === 0 ? 'all 0.3s ease' : '0s'};
      transform: translate(${position}px);
   `;
};
// правый отступ от каждого слайда, кроме конечного
const margin = 15;
const marginRight = (slides) => {
   slides.forEach(slide => slide.style.marginRight = `${margin}px`);
};

const initSlider = () => {
   for (let i = 0; i < slideItemLength; i++) {
      const slideBefore = slideItem[i].cloneNode(true);
      slideBefore.classList.add('duplicate-before');
      slideItem[0].before(slideBefore);
   }
   for (let i = slideItemLength - 1; i >= 0; i--) {
      const slideAfter = slideItem[i].cloneNode(true);
      slideAfter.classList.add('duplicate-after');
      slideItem[slideItemLength - 1].after(slideAfter);
   }
   const newSlideItem = document.querySelectorAll('.slider-item');
   marginRight(newSlideItem);
   // first-slide центрирование центральной группе уникальных слайдов
   position -= (sliderWidth + margin) * slideItemLength;
   move(position, 1);
};
initSlider();

const dot = () => {
   const dot = document.querySelectorAll('.slider-dot');
   dot.forEach(el => el.classList.remove('slider-dot-active'))
   dot[index].classList.add('slider-dot-active');
}
dot();



const checkPositionPrev = () => {
   // slide-prev
   if (position === -((sliderWidth + margin) * slideItemLength - (sliderWidth + margin) * 2)) {
      const newSlideItem = document.querySelectorAll('.slider-item');
      const newSlideItemLenght = newSlideItem.length;
      for (let i = newSlideItemLenght - slideItemLength; i < newSlideItemLenght; i++) {
         newSlideItem[0].before(newSlideItem[i]);
      };
      marginRight(newSlideItem);
      position -= (sliderWidth + margin) * slideItemLength + (sliderWidth + margin);
      move(position, 1);
      position += (sliderWidth + margin);
      setTimeout(() => {
         move(position, 0);
      }, 10);
   } else {
      move(position, 0);
   }
}
//проверка позиции дошли ли мы до подстраховывающего сбоку слайдера
const checkPositionNext = () => {
   // slide-next
   if (position === -((sliderWidth + margin) * slideItemLength * 2 + (sliderWidth + margin))) {
      //подцепились ко всем слайдам: боковым (подстраховывающие) и уникальным (по середине)
      const newSlideItem = document.querySelectorAll('.slider-item');
      const newSlideItemLenght = newSlideItem.length;
      //перекинули слайды, которые сбоку, с одного бока на другой бок, чтобы создать иллюзию бесконечного слайда
      for (let i = newSlideItemLenght - 1 - slideItemLength * 2; i >= 0; i--) {
         newSlideItem[newSlideItemLenght - 1].after(newSlideItem[i]);
      };
      position += (sliderWidth + margin) * slideItemLength + (sliderWidth + margin);//длина слайда*кол-во слайдов(уникальных)+длина слайда
      move(position, 1);
      //перематываем на 'кол-во слайдов + 1' шагов назад
      position -= (sliderWidth + margin);
      setTimeout(() => {
         move(position, 0);
      }, 10);
      //тут сделали вид что прокрутили на один слайд вперёд, хотя по факту не заметно для глаза мы уехали на 'кол-во слайдов + 1' назад, и после уже воспроизвели обычное перелистывание слайда вперёд
   } else {
      move(position, 0);
   }
}

btnNext.addEventListener('click', () => {
   index++;
   if (index === slideItemLength) {
      index = 0;
   }
   console.log(index)
   dot();
   position -= (sliderWidth + margin);
   checkPositionNext();
});
btnPrev.addEventListener('click', () => {
   index--;
   if (index < 0) {
      index = slideItemLength - 1;
   }
   dot();
   position += (sliderWidth + margin);
   checkPositionPrev();
});

dots.addEventListener('click', (e) => {
   const eTarget = e.target;
   if (eTarget.classList.contains('slider-dot')) {
      for (let i = 0; i < dots.childElementCount; i++) {
         dots.children[i].classList.remove('slider-dot-active');
      };
      eTarget.classList.add('slider-dot-active');
      let count;
      for (let i = 0; i < dots.childElementCount; i++) {
         if (dots.children[i].classList.contains('slider-dot-active')) {
            count = i;
         };
      };
      index = count;
      position = -((sliderWidth + margin) * slideItemLength + (sliderWidth + margin) * count);
      move(position, 0);
   };
});