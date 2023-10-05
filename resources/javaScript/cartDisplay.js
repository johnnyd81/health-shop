const cartContainer = document.querySelector(".product-container");
const grandTotal = document.querySelector(".grandTotal");

function displayCart() {
  let cartItems = JSON.parse(sessionStorage.getItem("cartItems"));

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

function displayTotal() {
  let total = sessionStorage.getItem("cartCost");
  total = parseInt(total);

  if (total) {
    grandTotal.textContent = `R ${total}, 00`;
  } else {
    grandTotal.textContent = `R 0, 00`;
  }
}

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

function adjustValues(key, action) {
  let cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
  let cartCost = sessionStorage.getItem("cartCost");
  let cartCount = sessionStorage.getItem("cartCount");
  cartCost = parseInt(cartCost);
  cartCount = parseInt(cartCount);

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
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  sessionStorage.setItem("cartCost", JSON.stringify(cartCost));
  sessionStorage.setItem("cartCount", JSON.stringify(cartCount));
}

displayCart();
displayTotal();
