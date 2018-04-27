const gallery = document.querySelector(".gallery");
const overlay = document.querySelector(".overlay");
const overlay_image = overlay.querySelector(".overlay__image");
const overlay_close_btn = overlay.querySelector(".overlay__close");

function createTemplate([hDigit, vDigit]) {
  return `
          <div class="item h-${hDigit} v-${vDigit}">
            <img class="item__image" src="images/${randomNumber(12)}.jpg">
            <div class="item__overlay">
              <button class="item__view-btn">View →</button>
            </div>
          </div>
        `;
}

function randomNumber(amount) {
  return Math.floor(Math.random() * amount + 1);
}

function openModal(e) {
  const path = e.currentTarget.querySelector(".item__image").src;
  overlay.classList.add("open");
  overlay_image.src = path;
}

function closeModal(e) {
  const overlay_inner = document.querySelector(".overlay__inner");

  if (!e.target.closest(".overlay__inner") || e.target == overlay_close_btn) {
    overlay.classList.remove("open");
  }
}

// Create 50 arrays ex. [1, 3] [2, 3]
// Use 'concat [1, 1]' to fill in all blanks
const digits = Array.from({ length: 50 }, () => [
  randomNumber(4),
  randomNumber(4)
]).concat([
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1]
]);

// Extract datas from digits array as argument into function
const template = digits.map(createTemplate).join("");
gallery.innerHTML = template;

const items = document.querySelectorAll(".item");
items.forEach(item => item.addEventListener("click", openModal));
overlay.addEventListener("click", closeModal);
