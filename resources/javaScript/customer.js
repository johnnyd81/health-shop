//required variables to access the DOM
const burgerMenu = document.querySelector(".hamburger-menu");
const hamLinks = document.querySelector(".ham-links");
const closeLinks = document.querySelector(".bx-x");

//open the links by adding the active class to the element's classList
burgerMenu.onclick = () => {
  hamLinks.classList.add("active"); //the add method is on the classList object
};

//close the links by removing the active class from the hamLinks element
closeLinks.onclick = () => {
  hamLinks.classList.remove("active");
};
