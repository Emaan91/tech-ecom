let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");
let carousel = document.querySelector(".carousel");
let listHTML = document.querySelector(".carousel .list");
let seeMoreButtons = document.querySelectorAll(".seeMore");
let backButton = document.getElementById("back");

nextButton.onclick = function () {
  showSlider("next");
};
prevButton.onclick = function () {
  showSlider("prev");
};

let unAcceptClick;
const showSlider = (type) => {
  // Prevent navigation if details are shown
  if (carousel.classList.contains("showDetail")) return;

  nextButton.style.pointerEvents = "none";
  prevButton.style.pointerEvents = "none";

  carousel.classList.remove("next", "prev");
  let items = document.querySelectorAll(".carousel .list .item");
  if (type === "next") {
    listHTML.appendChild(items[0]);
    carousel.classList.add("next");
  } else {
    listHTML.prepend(items[items.length - 1]);
    carousel.classList.add("prev");
  }

  clearTimeout(unAcceptClick);
  unAcceptClick = setTimeout(() => {
    nextButton.style.pointerEvents = "auto";
    prevButton.style.pointerEvents = "auto";
  }, 1000);
  clearInterval(autoPlay);
  autoPlay = setInterval(() => {
    nextButton.click();
  }, 5000);
};

// Auto play with check for "showDetail"
let autoPlay = setInterval(() => {
  if (!carousel.classList.contains("showDetail")) {
    nextButton.click();
  }
}, 5000);

// Handle "See More" button to stop autoplay and show details
seeMoreButtons.forEach((button) => {
  button.onclick = function () {
    carousel.classList.add("showDetail");
    clearInterval(autoPlay); // Stop auto play
  };
});

// Handle "Back" button to hide details and restart autoplay
backButton.onclick = function () {
  carousel.classList.remove("showDetail");
  autoPlay = setInterval(() => {
    if (!carousel.classList.contains("showDetail")) {
      nextButton.click();
    }
  }, 5000);
};

// Swipe Navigation
let startX, startY, endX, endY;

// Start touch event
carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

// End touch event
carousel.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  endY = e.changedTouches[0].clientY;

  handleSwipe();
});

// Detect and handle swipe direction with "showDetail" check
function handleSwipe() {
  if (carousel.classList.contains("showDetail")) return; // Prevent swipe if details are shown

  const diffX = startX - endX;
  const diffY = startY - endY;

  // Ignore if swipe is more vertical than horizontal
  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > 50) {
      // Swipe left
      nextSlide();
    } else if (diffX < -50) {
      // Swipe right
      prevSlide();
    }
  }
}

// Functions for navigating slides
function nextSlide() {
  if (!carousel.classList.contains("showDetail")) {
    document.getElementById("next").click(); // Simulate click on next button
  }
}

function prevSlide() {
  if (!carousel.classList.contains("showDetail")) {
    document.getElementById("prev").click(); // Simulate click on previous button
  }
}
