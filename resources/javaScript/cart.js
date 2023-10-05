//variables to dynamically alter the DOM
const productsCatalogue = document.querySelector(".catalogueList");

//the products are stored in an array called products
let products = [
  {
    name: "Abdominal wheel",
    tag: "ab_wheel",
    price: 350,
    image: "resources/images/ab-wheel.jpeg",
    quantity: 0,
  },

  {
    name: "Exercise bands",
    tag: "exercise_bands",
    price: 550,
    image: "resources/images/bands.jpeg",
    quantity: 0,
  },

  {
    name: "Ezbar",
    tag: "ezbar",
    price: 890,
    image: "resources/images/ez-bar.jpeg",
    quantity: 0,
  },

  {
    name: "Door pullup bar",
    tag: "door_pull_up_bar",
    price: 750,
    image: "resources/images/door-gym.jpeg",
    quantity: 0,
  },

  {
    name: "Gym bench",
    tag: "gym_bench",
    price: 1650,
    image: "resources/images/bench.jpeg",
    quantity: 0,
  },

  {
    name: "Baseball cap",
    tag: "baseball_cap",
    price: 490,
    image: "resources/images/new-york-cap.jpeg",
    quantity: 0,
  },

  {
    name: "Boxing and speed bag set",
    tag: "boxing_bag_set",
    price: 2490,
    image: "resources/images/boxing_combo.jpeg",
    quantity: 0,
  },

  {
    name: "Nutritech whey protein 2kg",
    tag: "nutritech_whey_protein",
    price: 990,
    image: "resources/images/nutritech_protein.jpeg",
    quantity: 0,
  },

  {
    name: "Nutritech protein bars",
    tag: "nutritech_protein_bars",
    price: 550,
    image: "resources/images/nutritech-whey-protein-bar.jpeg",
    quantity: 0,
  },

  {
    name: "RDX combat gloves",
    tag: "rdx_combat_gloves",
    price: 450,
    image: "resources/images/rdx_combat_gloves.jpeg",
    quantity: 0,
  },
];

//add catalogue items dynamically
products.forEach((product) => {
  let html = `
     <div class="catalogueItem" >
       <img src=${product.image} alt="exercise-item" />
       <div class="catalogueDetails">
        <p>${product.name}</p>
        <p>R ${product.price},00</>
       </div>
       <div class="action">
         <abbr title="Adds the product to the cart"><i class='bx bxs-cart-add'></i></abbr>
       </div>
     </div>
  `;
  productsCatalogue.innerHTML += html;
});

const items = document.querySelectorAll(".bxs-cart-add");

for (let i = 0; i < items.length; i++) {
  items[i].addEventListener("click", function () {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

function cartNumbers(item) {
  let cartCmount = sessionStorage.getItem("cartCount");
  cartCmount = parseInt(cartCmount);

  if (cartCmount) {
    sessionStorage.setItem("cartCount", cartCmount + 1);
    document.querySelector(".count").textContent = cartCmount + 1;
  } else {
    sessionStorage.setItem("cartCount", 1);
    document.querySelector(".count").textContent = 1;
  }

  setItem(item);
}

function setItem(product) {
  let cartItems = JSON.parse(sessionStorage.getItem("cartItems"));

  if (cartItems !== null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].quantity += 1;
  } else {
    product.quantity = 1;
    cartItems = {
      [product.tag]: product,
    };
  }
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function checkCart() {
  let cartAmount = sessionStorage.getItem("cartCount");
  cartAmount = parseInt(cartAmount);

  if (cartAmount) {
    document.querySelector(".count").textContent = cartAmount;
  } else {
    document.querySelector(".count").textContent = 0;
  }
}

function totalCost(product) {
  let cartCost = sessionStorage.getItem("cartCost");
  cartCost = parseInt(cartCost);

  if (cartCost) {
    cartCost = cartCost + product.price;
  } else {
    cartCost = product.price;
  }
  sessionStorage.setItem("cartCost", JSON.stringify(cartCost));
}

checkCart(); //displays the correct amount of items in the cart when the page loads

/*when the confirm button is clicked the variable called digit generates a random number using a function utilising Math.floor and Math.random.
The random number will go up to 10000*/

// $(document).ready(function () {
//   $(".sectionBody").hide(); //this line hides the body of the accordion
//   $(".sectionTitle").hover(function () {
//     $(".sectionBody").hide();
//     $(this).next().show(); //the this refers to the title,the next refers to the body of the accordion
//   }) //show () reveals the body of the accordion
// });

// $(document).ready(function () {
//   $(".cover1,.cover2").hover(function () {
//     $(this).fadeOut(5000);
//   }) //fades the elements when the mouse cursor hovers over them
//   $(".cover1,.cover2").hover(function () {
//     $("img").fadeIn(5000);
//   }) //fades the elements in when cursor hovers over them
// });

// $(document).ready(function () {
//   $(".button1").click(function () {
//     $(".pic1,.container1,.container2,.container3,h1").fadeOut(6000).fadeIn(6000);
//     $(".container1,.container2,.container3").css("background-color", "lightblue");
//     $(".container1,.container2,.container3").css("font-weight", "bolder"); //the font-weight is altered
//   }) //when the button is clicked the elements in the selector fade out and then fade in again
// }) //the background color of the elements also changes

// $(document).ready(function () {
//   function Bounce() {
//     $("#confirm").animate({
//       top: "100px", //the button is animated by altering it's width
//       width: "200px"
//     }, 1000, function () {
//       $("#confirm").animate({
//         top: "300px",
//         width: "220px"
//       }, 1000, Bounce)
//     });
//   } //the function is repeatedly called to create a pulsating effect
//   Bounce();
// })
