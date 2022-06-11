document.addEventListener("DOMContentLoaded", function () {
  
// slider-hero start

const swiper = new Swiper('.hero__swiper', {
  allowTouchMove: false,
  loop: true,
  effect: 'fade',
  speed: 8000,
  autoplay: {
    delay: 5000
  }
});

// slider-hero finish

// modals contacts start

const btns = document.querySelectorAll('.modal-call');
const modalOverlay = document.querySelector('.modal-overlay ');
const modals = document.querySelectorAll('.modal');
const body = document.body;
const fixBlocks = document.querySelectorAll('.fix-block');
const closeBtns = document.querySelectorAll('.modal-close-btn');

let disableScroll = function () {
  let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
  let pagePosition = window.scrollY;
  fixBlocks.forEach((el) => {
    el.style.paddingRight = paddingOffset;
  });
  body.style.paddingRight = paddingOffset;
  body.classList.add('disable-scroll');
  body.dataset.position = pagePosition;
  // body.style.top = -pagePosition + 'px';
}

let enableScroll = function () {
  let pagePosition = parseInt(document.body.dataset.position, 10);
  body.style.top = 'auto';
  body.classList.remove('disable-scroll');
  fixBlocks.forEach((el) => {
    el.style.paddingRight = '0px';
  });
  body.style.paddingRight = '0px';
  window.scroll({ top: pagePosition, left: 0 });
  body.removeAttribute('data-position');
}

btns.forEach((el) => {
  el.addEventListener('click', (e) => {
    let path = e.currentTarget.getAttribute('data-path');

    disableScroll();

    modals.forEach((el) => {
      el.classList.remove('modal--visible');
    });

    document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
    modalOverlay.classList.add('modal-overlay--visible');
  });
});

closeBtns.forEach((el) => {
  el.addEventListener('click', (e) => {
    closeModals();
  });
});

document.addEventListener('keydown', function (e) {
  if (e.key === "Escape") {
    closeModals();
  }
});

// функция закрытия модалок
let closeModals = () => {
  enableScroll();
  modalOverlay.classList.remove('modal-overlay--visible');
  modals.forEach((el) => {
    el.classList.remove('modal--visible');
  });
}

modalOverlay.addEventListener('click', (e) => {

  if (e.target == modalOverlay) {
    closeModals();
  }
});

// modals contacts finish
});