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



  // hamburger start

  document.querySelector(".header__burger-open").addEventListener("click", function () {
    document.querySelector(".header__nav").classList.add("active");
    document.body.classList.add("locked");
  });

  document.querySelector(".header__burger-closed").addEventListener("click", function () {
    document.querySelector(".header__nav").classList.remove("active");
    document.body.classList.remove("locked");
  });

  // hamburger finish



  // function for smooth scrolling + closing the burger menu by clicking on the link + button for smooth return to the top start

  /*  Функция для прокрутки с контролем скорости
    /*  --------------------------------------------------------------*/
  function scrollTo(to, duration = 700) {
    const
      element = document.scrollingElement || document.documentElement;
    const start = element.scrollTop;
    const change = to - start;
    const startDate = + new Date();
    // t = current time
    // b = start value
    // c = change in value
    // d = duration
    const easeInOutQuad = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) {
        return c / 2 * t * t + b;
      }
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };
    const animateScroll = function () {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
      element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration), 10);
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = to;
      }
    };
    animateScroll();
  }

  const initScrollToAnchor = () => {
    const anchorLinks = document.querySelectorAll('.header__item-link');
    if (anchorLinks.length) {
      anchorLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
          const currentBlock = link.getAttribute('href');
          // console.log(currentBlock);
          const blockTop = document.querySelector(currentBlock).offsetTop;
          e.preventDefault();
          scrollTo(blockTop, 1200);

          const menu = e.target.closest('.header__nav');
          // console.log(menu);
          if (menu.classList.contains('active')) {
            menu.classList.remove('active');
            document.body.classList.remove("locked");
          }
        });
      });
    }
  };
  initScrollToAnchor();

  const initBtnToTop = () => {
    const btnToTop = document.querySelector('.button__to-top');
    if (btnToTop) {
      const scrollHeight = 1500;
      window.addEventListener('scroll', function () {
        // Если прокрутили дальше scrollHeight пикселей от верха вьюпорта, показываем кнопку
        // eslint-disable-next-line no-invalid-this
        if (this.scrollY > scrollHeight) {
          btnToTop.classList.add('button__to-top--is-shown');
          // Иначе прячем
        } else {
          btnToTop.classList.remove('button__to-top--is-shown');
        }
      });
      // При клике прокручиваем на самый верх
      btnToTop.addEventListener('click', (e) => {
        e.preventDefault();
        // Вызываем функцию, первый аргумент - отступ, второй - скорость скролла, чем больше значение, тем медленнее скорость прокрутки
        scrollTo(0, 1000);
      });
    }
  };
  initBtnToTop();

  // function for smooth scrolling + closing the burger menu by clicking on the link + button for smooth return to the top finish



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