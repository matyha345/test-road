const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = "true";

const timeout = 800;

if (popupLinks.length > 0) {
  for (let i = 0; i < popupLinks.length; i++) {
    const popupLink = popupLinks[i];
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute("href").replace("#", "");
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}

const popupCloseIcon = document.querySelectorAll(".close-popup");

if (popupCloseIcon.length > 0) {
  for (let i = 0; i < popupCloseIcon.length; i++) {
    const el = popupCloseIcon[i];
    el.addEventListener("click", function (e) {
      popupClose(el.closest(".popup"));
      e.preventDefault();
    });
  }
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    // для доп popup (сейчас его нет)
    const popupActive = document.querySelector(".popup.open");
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    curentPopup.classList.add("open");
    curentPopup.addEventListener("click", function (e) {
      if (!e.target.closest(".popup__content")) {
        popupClose(e.target.closest(".popup"));
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove("open");
    if (doUnlock) {
      bodyUnlock();
    }
  }
}
function bodyLock() {
  const lockPaddingValue =
    window.innerWidth -
    document.querySelector(".wrapper-popup").offsetWidth +
    "px";
  if (lockPadding.length > 0) {
    for (let i = 0; i < lockPadding.length; i++) {
      const el = lockPadding[i];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add("lock");

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnlock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let i = 0; i < lockPadding.length; i++) {
        const el = lockPadding[i];
        el.style.paddingRight = "0px";
      }
    }
    body.style.paddingRight = "0px";
    body.classList.remove("lock");
  }, 0);
  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener("keydown", function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector(".popup.open");
    popupClose(popupActive);
  }
});

var burger = document.querySelector(".burger");
var headerTop = document.querySelector(".header__top");
var isMenuOpen = false;

burger.addEventListener("click", function (e) {
  e.preventDefault();
  isMenuOpen = !isMenuOpen;
  headerTop.classList.toggle("header__top-open", isMenuOpen);
});

// Добавляем обработчик события на весь документ
document.addEventListener("click", function (e) {
  // Проверяем, был ли клик выполнен внутри бургер-меню или на самом бургере
  if (!headerTop.contains(e.target) && e.target !== burger) {
    isMenuOpen = false;
    headerTop.classList.remove("header__top-open");
  }
});

// --------------------

$(function () {
  $(".program__acc-link").on("click", function (e) {
    e.preventDefault();
    if ($(this).hasClass("program__acc-link--active")) {
      $(this).removeClass("program__acc-link--active");
      $(this).children(".program__acc-text").slideUp();
    } else {
      $(".program__acc-link").removeClass("program__acc-link--active");
      $(".program__acc-text").slideUp();
      $(this).addClass("program__acc-link--active");
      $(this).children(".program__acc-text").slideDown();
    }
  });
});
$(function () {
  $(".questions__acc-link").on("click", function (e) {
    e.preventDefault();
    if ($(this).hasClass("questions__acc-link--active")) {
      $(this).removeClass("questions__acc-link--active");
      $(this).children(".questions__acc-text").slideUp();
    } else {
      $(".questions__acc-link").removeClass("questions__acc-link--active");
      $(".questions__acc-text").slideUp();
      $(this).addClass("questions__acc-link--active");
      $(this).children(".questions__acc-text").slideDown();
    }
  });
});

// ===========================mentorImagesSwiper====================
// ===========================mentorImagesSwiper====================

const mentorImagesSwiper = new Swiper("#mentor-swiper .swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  slidesPerView: 1,
  autoplay: {
    delay: 2000, // Задержка между слайдами в миллисекундах (в данном случае, 3 секунды)
    disableOnInteraction: true, // Оставить автоплей после взаимодействия пользователя (например, при перелистывании слайдов)
  },
  // Navigation arrows
  navigation: {
    nextEl: ".mentor__btn-next",
    prevEl: ".mentor__btn-prev",
  },
});

const mentorQuestionsSwiper = () => {
  const results = document.getElementById("mentor-swiper-results");

  const cardsMentor = dataMentor.map(
    (review) => `
    <div class="swiper-slide">
      <img class="mentor__swiper-img" height="280px" src="${review}" alt="#">
    </div>
  `
  );

  // Развернуть массив cardsMentor
  const reversedCards = cardsMentor.reverse();

  results.innerHTML = reversedCards.join("");
};

mentorQuestionsSwiper();

// ===========================ReviewsSwiper====================
// ===========================ReviewsSwiper====================

const swiper = new Swiper("#reviews-swiper .swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  spaceBetween: 20,
  slidesPerView: 2,
  // Navigation arrows
  navigation: {
    nextEl: ".btn__next",
    prevEl: ".btn__prev",
  },
  breakpoints: {
    900: {
      slidesPerView: 3,
      spaceBetween: 10,
    },

    500: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 1,
    },
    400: {
      slidesPerView: 1,
    },
    320: {
      slidesPerView: 1,
    },
  },
});

const generateReviewsSwiper = () => {
  const results = document.getElementById("reviews-swiper-results");

  const cardsArr = dataReviews.map(
    (review) => `
    <div class="swiper-slide">
    <img class="reviews__swiper-img"  src="${review}" alt="#">
    </div>
  `
  );

  results.innerHTML = cardsArr.join("");
};

generateReviewsSwiper();

///Скрипт плавного перехода к нужному блоку --------------------------------------------------------

// const anchors = document.querySelectorAll('a[href*="#"]');

// for (let anchor of anchors) {
//   anchor.addEventListener("click", function (e) {
//     e.preventDefault();
//     const blockID = anchor.getAttribute("href");
//     const offset = parseInt(anchor.getAttribute("data-offset")) || 0; // парсим значение атрибута или задаем 0, если атрибут не задан
//     const targetElement = document.querySelector(blockID.replace('#', ''));
//     const targetPosition =
//       targetElement.getBoundingClientRect().top + window.pageYOffset; // вычисляем положение целевого элемента относительно верхней границы видимой области
//     const offsetPosition = targetPosition - offset; // вычисляем позицию, на которую нужно скролить
//     window.scrollTo({
//       top: offsetPosition,
//       behavior: "smooth",
//     });
//   });
// }

