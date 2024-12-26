//required elements to access the DOM
const burgerMenu = document.querySelector(".hamburger-menu");
const hamLinks = document.querySelector(".ham-links");
const closeLinks = document.querySelector(".bx-x");

//open links by adding the active class to the element
burgerMenu.onclick = () => {
  hamLinks.classList.add("active");
};

//close the links by removing the active class from the hamLinks element
closeLinks.onclick = () => {
  hamLinks.classList.remove("active");
};
