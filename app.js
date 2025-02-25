const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const carousel = document.querySelector(".carousel");
const listHTML = document.querySelector(".carousel .list");
const backButton = document.getElementById("back");

let autoPlay;
let unAcceptClick;

// Function to update autoplay
const startAutoPlay = () => {
  clearInterval(autoPlay);
  autoPlay = setInterval(() => {
    if (!carousel.classList.contains("showDetail")) {
      nextButton.click();
    }
  }, 5000);
};

// Slider Functionality
const showSlider = (type) => {
  if (carousel.classList.contains("showDetail")) return;

  // Prevent multiple clicks
  if (unAcceptClick) return;
  unAcceptClick = true;

  carousel.classList.remove("next", "prev");
  const items = document.querySelectorAll(".carousel .list .item");

  if (type === "next") {
    listHTML.appendChild(items[0]);
    carousel.classList.add("next");
  } else {
    listHTML.prepend(items[items.length - 1]);
    carousel.classList.add("prev");
  }

  setTimeout(() => {
    unAcceptClick = false;
  }, 1000);

  startAutoPlay();
};

nextButton.onclick = () => showSlider("next");
prevButton.onclick = () => showSlider("prev");

// Auto-play initialization
startAutoPlay();

// Handle "See More" and "Back" buttons using event delegation
document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("seeMore")) {
    carousel.classList.add("showDetail");
    clearInterval(autoPlay);
  } else if (e.target === backButton) {
    carousel.classList.remove("showDetail");
    startAutoPlay();
  }
});

// Swipe Navigation
let startX, startY;

carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

carousel.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;

  const diffX = startX - endX;
  const diffY = startY - endY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    diffX > 50 ? nextButton.click() : diffX < -50 && prevButton.click();
  }
});
