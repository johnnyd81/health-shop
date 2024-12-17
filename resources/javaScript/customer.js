//required elements to access the DOM
const burgerMenu = document.querySelector(".hamburger-menu");
const hamLinks = document.querySelector(".ham-links");
const closeLinks = document.querySelector(".bx-x");

burgerMenu.onclick = () => {
  hamLinks.classList.add("active");
};

closeLinks.onclick = () => {
  hamLinks.classList.remove("active");
};
