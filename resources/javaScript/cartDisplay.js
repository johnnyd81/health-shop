//required variables to access the DOM elements
const openCartBtns = document.querySelectorAll(".open-cart");
const cartContainer = document.querySelector(".cart-container");
const grandTotal = document.querySelector(".total-price");
const hamlinks = document.querySelector(".ham-links");
const productContainer = document.querySelector(".product-container");
const cartContent = document.querySelector(".cart-content");
const closeCartBtn = document.querySelector(".bx-x-circle");
const cartCountUI = document.querySelectorAll(".count");
const buyBtn = document.querySelector(".btn-buy");
const orderContainer = document.querySelector(".order-container");
const confirmTotal = document.querySelector(".confirm-total-amount");

//an event handler is placed on the cart buttons that allows them to open the cart component
openCartBtns.forEach((openCartBtn) =>
  openCartBtn.addEventListener("click", function () {
    cartContainer.classList.toggle("show");
    hamlinks.classList.remove("active");
    displayCart();
    displayTotal();
  })
);

//adds an onclick event handler to the closeCartBtn to remove the show class thereby closing the cart
closeCartBtn.onclick = () => {
  cartContainer.classList.remove("show");
};

productContainer.onclick = function () {
  // when the productContainer is clicked then the cartContainer will close since the "show" class is removed
  cartContainer.classList.contains("show") &&
    cartContainer.classList.remove("show");
};

//keep track of amount of items in the cart and update the UI when the items change
function adjustCartValues() {
  let count = parseInt(sessionStorage.getItem("cartCount"));
  if (!count) {
    cartCountUI.forEach((cart) => (cart.textContent = 0));
  } else {
    cartCountUI.forEach((cart) => (cart.textContent = count));
  }
}

//the displayCart function dynamically displays all the items in the cart onscreen
function displayCart() {
  let cartItems = JSON.parse(sessionStorage.getItem("cartItems"));

  //by retrieving the cartItems and using Object.values(), the values can be looped over as an array
  if (cartContent && cartItems) {
    cartContent.innerHTML = "";
    Object.values(cartItems).map((item) => {
      cartContent.innerHTML += `
        <div class="cart-item" id=${item.tag}>
            <i class='bx bxs-x-circle ${
              item.tag
            } delete' title="Remove item from cart"></i>
            <div class="cart-image" >
              <img src=${item.image} alt="item" height="90" width="90" />
            </div>
          <div class="cart-details">
            <span class="item-name">${item.name}</span>
            <span class="item-price">R ${item.price * item.quantity},00</span>
            <div class="quantity-adjuster ${item.tag}">
              <i class='bx bxs-minus-circle reduce' title="Reduce quantity"></i>
              <span class="quantity-count">${item.quantity}</span>
              <i class='bx bxs-plus-circle increase' title="Increase quantity"></i>
            </div>
          </div>
        </div>
      `;
    });
  }
}

function confirmItems() {
  let cartItems = JSON.parse(sessionStorage.getItem("cartItems"));

  //by retrieving the cartItems and using Object.values(), the values can be looped over as an array
  if (orderContainer && cartItems) {
    orderContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      orderContainer.innerHTML += `
        <div class="confirm-item" id=${item.tag}>
       
            <div class="confirm-image-name" >
            <p class="item-name">${item.name}</p>
              <img src=${item.image} alt="item" height="60" width="60" />
             
            </div>
          <div class="confirm-cart-details">
          X <span class="confirm-quantity">${item.quantity}</span>
          </div>
        </div>
        <hr/>
      `;
    });
  }
}

//displays the final total of all the products in the cart
function displayTotal() {
  let total = sessionStorage.getItem("cartCost");
  total = parseInt(total);

  if (total) {
    grandTotal.textContent = `R ${total}, 00`;
    confirmTotal.textContent = `${total}`;
    buyBtn.disabled = false;
    buyBtn.style.cursor = "pointer";
  } else {
    grandTotal.textContent = `R 0, 00`;
    buyBtn.disabled = true;
    buyBtn.style.cursor = "not-allowed";
  }
}

// update the total in the user interface and adjust the cart values onscreen in real time
function updateTotal() {
  displayTotal();
  adjustCartValues();
}

//a single click event listener is placed on the cartContainer
//each click from a child element bubbles up and sets off the event handler in the parent
//each event has a target that specifies the origin of the click event and which functions should be called i.e. delete, edit, reduce, increment
cartContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    adjustValues(e.target.classList[2], e.target.classList[3]);
    updateTotal();
  } else if (e.target.classList.contains("reduce")) {
    adjustValues(e.target.parentElement.classList[1], e.target.classList[2]);
    displayCart();
    updateTotal();
  } else if (e.target.classList.contains("increase")) {
    adjustValues(e.target.parentElement.classList[1], e.target.classList[2]);
    displayCart();
    updateTotal();
  }
});

//the adjustvalues function modifies values in the shopping cart according to the button that is being clicked
function adjustValues(key, action) {
  let cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
  let cartCost = sessionStorage.getItem("cartCost");
  let cartCount = sessionStorage.getItem("cartCount");
  cartCost = parseInt(cartCost);
  cartCount = parseInt(cartCount);

  //by looping an object by it's key, the specific cart item can be modified individually
  for (let item in cartItems) {
    if (key == item && action == "delete") {
      cartCost = cartCost - cartItems[item].price * cartItems[item].quantity;
      cartCount = cartCount - cartItems[item].quantity;
      delete cartItems[item];
    } else if (key == item && action == "reduce") {
      if (cartItems[item].quantity == 1) {
        return;
      } else {
        cartCost = cartCost - cartItems[item].price;
        cartCount = cartCount - 1;
        cartItems[item].quantity -= 1;
      }
    } else if (key == item && action == "increase") {
      cartCost = cartCost + cartItems[item].price;
      cartCount = cartCount + 1;
      cartItems[item].quantity += 1;
    }
  }
  //the cartItems, cartCost and cartNumbers are updated in sessionStorage to keep the values up to date
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  sessionStorage.setItem("cartCost", JSON.stringify(cartCost));
  sessionStorage.setItem("cartCount", JSON.stringify(cartCount));
}

displayCart();
displayTotal();
adjustCartValues();
