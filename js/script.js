'use strict';
// Подстветка пунктов меню при скролле
const menuLinks = document.querySelectorAll('a.menu__link[data-goto]');
const menuClases = [];
menuLinks.forEach(menuLink => {
	menuClases.push(menuLink.dataset.goto);
})
window.addEventListener("scroll", function(){
	const elem = document.elementFromPoint(150, 150);
	menuLinks.forEach(menuLink => {
		if (menuClases.includes('.' + elem.closest('section').className)) {
			if (menuLink.dataset.goto === '.' + elem.closest('section').className){
				menuLink.parentNode.classList.add('_active');
			} else {
				menuLink.parentNode.classList.remove('_active');
			}
		}
	})
});

// Позиционирование меню
const mainScreen = document.querySelector('.main-screen');
const header = document.querySelector('.header');
window.addEventListener('scroll', function (e) {
	const mainScreenHeight = mainScreen.scrollHeight;
	if (window.scrollY + 50 > mainScreenHeight) {
		header.classList.add('_fixed');
	} else {
		header.classList.remove('_fixed');
	}
});


// Бургер

const menuIcon = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
const body = document.querySelector('body');

menuIcon.addEventListener("click", function (event) {
	menuIcon.classList.toggle('_active');
	menuBody.classList.toggle('_active');
	body.classList.toggle('_lock');
});

document.addEventListener("click", function (event) {
	if (!event.target.closest('.menu__icon')) {
		menuIcon.classList.remove('_active');
		menuBody.classList.remove('_active');
		body.classList.remove('_lock');
	}
});

// Скролл до разделов меню
const links = document.querySelectorAll('a[data-goto]');
if (links.length > 0) {
	links.forEach(link => {
		link.addEventListener("click", onMenuClick);
	});

	function onMenuClick(event) {
		const link = event.target;
		if (link.dataset.goto && document.querySelector(link.dataset.goto)) {
			const gotoBlock = document.querySelector(link.dataset.goto);
			const offsetPosition = gotoBlock.getBoundingClientRect().top;

			window.scrollBy({
				top: offsetPosition - 20,
				behavior: 'smooth'
			});
			event.preventDefault();
		}
	}
}

const input = document.querySelector('.input');
let placeholder = input.getAttribute('placeholder');

input.addEventListener("focus", function (event) {
	if (input.nextElementSibling) {
		input.classList.remove('_error');
		input.nextElementSibling.remove();
	};
	if (input.getAttribute('placeholder')) {
		placeholder = input.getAttribute('placeholder');
	};
	input.setAttribute('placeholder', '');
	input.classList.add('_active');
});

input.addEventListener("blur", function (e) {
	if (!input.value) {
		input.setAttribute('placeholder', placeholder);
		input.classList.remove('_active');
	}
});

const subscribeForm = document.forms.subscribe;
function emailTest(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
};

// Изменение стилей при фокусе input и неправильном вводе email
subscribeForm.addEventListener('submit', function (event) {
	if (emailTest(input)) {
		if (!input.nextElementSibling){
			input.parentElement.insertAdjacentHTML(
				"beforeend",
				`<div class="subscribe__input_error">
					Введите правильный email
				</div>`
			);
		}
		input.classList.add('_error');
		event.preventDefault();
	}
});