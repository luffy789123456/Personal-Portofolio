"use strict";

const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  selectedValue = selectedValue.toLowerCase();
  filterItems.forEach((item) => {
    const itemCategory = item.dataset.category.toLowerCase();
    if (selectedValue === "all" || selectedValue === itemCategory) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

function togglePlay(item) {
  const audio = item.querySelector(".music-audio");
  const playOverlay = item.querySelector(".play-overlay");

  document.querySelectorAll(".music-item").forEach((otherItem) => {
    const otherAudio = otherItem.querySelector(".music-audio");
    const otherPlayOverlay = otherItem.querySelector(".play-overlay");
    if (otherAudio !== audio) {
      otherAudio.pause();
      otherAudio.currentTime = 0;
      otherPlayOverlay.textContent = "▶";
    }
  });

  if (audio.paused) {
    audio.play();
    playOverlay.textContent = "❚❚";
  } else {
    audio.pause();
    playOverlay.textContent = "▶";
  }

  audio.onended = () => {
    playOverlay.textContent = "▶";
  };
}

function updateProgress(audio) {
  const progressBar = audio.closest(".music-content").querySelector(".progress-bar");
  const percentage = (audio.currentTime / audio.duration) * 300;
  progressBar.style.width = percentage + "%";
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".music-item").forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("show");
    }, index * 300);
  });
});

function togglePlay(el) {
  let audio = el.querySelector(".music-audio");
  if (audio.paused) {
    document.querySelectorAll(".music-audio").forEach((a) => a.pause());
    audio.play();
  } else {
    audio.pause();
  }
}

function updateProgress(audio) {
  let progress = (audio.currentTime / audio.duration) * 100;
  audio.closest(".music-content").querySelector(".progress-bar").style.width = progress + "%";
}

document.addEventListener("DOMContentLoaded", function () {
  const aboutSection = document.querySelector(".about");

  function showAboutSection() {
    aboutSection.classList.add("show");
  }

  function hideAboutSection() {
    aboutSection.classList.remove("show");
  }

  document.querySelector("[data-page='about']").addEventListener("click", showAboutSection);
  document.querySelectorAll("[data-page]:not([data-page='about'])").forEach((el) => {
    el.addEventListener("click", hideAboutSection);
  });
});

const nameText = "M Lutfi Mubarok";
const nameElement = document.getElementById("name-text");
let index = 0;
let isTyping = true;
let cursorVisible = true;

function updateText() {
  nameElement.innerHTML = nameText.substring(0, index) + (cursorVisible ? '|' : '');
}

function blinkCursor() {
  cursorVisible = !cursorVisible;
  updateText();
  setTimeout(blinkCursor, 500);
}

function type() {
  if (isTyping && index < nameText.length) {
    index++;
    updateText();
    setTimeout(type, 400);
  } else {
    isTyping = false;
    setTimeout(erase, 1000);
  }
}

function erase() {
  if (!isTyping && index > 0) {
    index--;
    updateText();
    setTimeout(erase, 100);
  } else {
    isTyping = true;
    setTimeout(type, 500);
  }
}

blinkCursor();
type();


document.addEventListener("DOMContentLoaded", function () {
  gsap.from(".resume", {
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
  });

  gsap.from(".timeline-item", {
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    stagger: 0.3,
  });

  gsap.from(".icon-box", {
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
    stagger: { amount: 0.5, from: "start" },
  });

  gsap.from(".service", {
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
    delay: 0.5,
  });

  gsap.from(".service-item", {
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    stagger: 0.3,
    delay: 0.7,
  });

  gsap.utils.toArray(".project-item").forEach((item) => {
    gsap.from(item, {
      scrollTrigger: item,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  });

  gsap.utils.toArray(".skills-item").forEach((item, index) => {
    gsap.from(item, {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      delay: index * 0.5,
    });
  });

  gsap.utils.toArray(".game-item").forEach((item, index) => {
    gsap.from(item, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: index * 0.3,
    });
  });

  gsap.from(".testimonial-item", {
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    stagger: 0.3,
    delay: 0.5,
  });

  gsap.from(".music-item", {
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    stagger: 0.3,
    delay: 0.5,
  });
}); 