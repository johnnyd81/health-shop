//Dom variable to render cart item amount
const cartNumber = document.querySelector(".count");

//checks if cart items are present in the shopping cart
//the number of items are then used to update the textContent in the user interface
function checkCart() {
  let cartCount = sessionStorage.getItem("cartCount");
  cartCount = parseInt(cartCount);

  if (cartCount) {
    cartNumber.textContent = cartCount;
  } else {
    cartNumber.textContent = 0;
  }
}

checkCart(); //updates the user interface to show the amount of items in the cart
