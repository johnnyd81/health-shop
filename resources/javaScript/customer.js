//required variables to access the DOM using javaScript
const burgerMenu = document.querySelector(".hamburger-menu");
const hamLinks = document.querySelector(".ham-links");
const closeLinks = document.querySelector(".bx-x");

//open the links by adding the active class to the element's css classList
burgerMenu.onclick = () => {
  hamLinks.classList.add("active"); //the add method is available on the classList object
};

//close the links by removing the active class from the hamLinks element
closeLinks.onclick = () => {
  //use the remove method to remove the 'active' class from the classList
  hamLinks.classList.remove("active");
};
