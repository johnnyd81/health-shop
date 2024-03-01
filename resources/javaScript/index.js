//required DOM elements
const burgerMenu = document.querySelector(".hamburger-menu");
const hamLinks = document.querySelector(".ham-links");
const closeLinks = document.querySelector(".bx-x");
const imgs = document.querySelectorAll(".slider img");
const captions = document.querySelectorAll(".caption");
const dots = document.querySelectorAll(".dot");
const boxContainer = document.querySelector(".navBtn-box");
let currImg = 0;
const interval = 7000;
//the timer uses the changeSlide function to change a slide every 7 seconds
let timer = setInterval(changeSlide, interval);

function changeSlide(n) {
  //when the function is called the slides are all made transparent and the activeBtn class is removed
  for (let i = 0; i < imgs.length; i++) {
    imgs[i].style.opacity = 0;
    dots[i].classList.remove("activeBtn");
    captions[i].style.opacity = 0;
  }
  //the currImg variable is updated by 1 until it reaches the full length of the imgs array
  //thereafter currImg will equal 5 and the modulus of 5 and 5 is 0 that restarts the image slider
  currImg = (currImg + 1) % imgs.length;

  //if a user clicks a navigation button then n has a value and the automatic changing of the slides are restarted again
  if (n != undefined) {
    clearInterval(timer);
    timer = setInterval(changeSlide, interval);
    currImg = n;
  }

  imgs[currImg].style.opacity = 1;
  dots[currImg].classList.add("activeBtn");
  captions[currImg].style.opacity = 1;
}

boxContainer.addEventListener("click", function (e) {
  changeSlide(e.target.classList[1]);
});

burgerMenu.onclick = () => {
  hamLinks.classList.add("active");
};

closeLinks.onclick = () => {
  hamLinks.classList.remove("active");
};
