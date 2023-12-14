//required DOM elements
const cartContainer = document.querySelector(".product-container");
const grandTotal = document.querySelector(".grandTotal");

//the displayCart function dynamically displays all the items in the cart onscreen
function displayCart() {
  let cartItems = JSON.parse(sessionStorage.getItem("cartItems"));

  //by retrieving the cartItems and using Object.values(), the values can be looped over as an array
  if (cartContainer && cartItems) {
    cartContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      cartContainer.innerHTML += `
        <div class="cart-item" id=${item.tag}>
          <abbr title="Remove item from cart">
            <i class='bx bxs-x-circle ${item.tag} delete'></i>
          </abbr>
          <div class="cart-image">
            <img src=${item.image} alt="health item" />
          </div>  
          <div class="cart-details">
            <span class="item-name">${item.name}</span>
            <span class="item-price">R ${item.price * item.quantity},00</span>
            <div class="quantity-adjuster ${item.tag}">
              <abbr title="Reduce quantity"><i class='bx bxs-minus-circle reduce'></i></abbr>
              <span class="quantity-count">${item.quantity}</span>
              <abbr title="Increase quantity"><i class='bx bxs-plus-circle increase'></i></abbr>
            </div>
          </div>
        </div>
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
  } else {
    grandTotal.textContent = `R 0, 00`;
  }
}

//a single click event listener is placed on the cartContainer
//each click from a child element bubbles up and sets off the event handler in the parent
//each event has a target that specifies the origin of the click event and which functions should be called i.e. delete, edit, reduce, increment
cartContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.parentElement.remove();
    adjustValues(e.target.classList[2], e.target.classList[3]);
    displayTotal();
  } else if (e.target.classList.contains("reduce")) {
    adjustValues(
      e.target.parentElement.parentElement.classList[1],
      e.target.classList[2]
    );
    displayCart();
    displayTotal();
  } else if (e.target.classList.contains("increase")) {
    adjustValues(
      e.target.parentElement.parentElement.classList[1],
      e.target.classList[2]
    );
    displayCart();
    displayTotal();
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
