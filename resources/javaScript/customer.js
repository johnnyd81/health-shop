const cartNumber = document.querySelector(".count");

function checkCart() {
  let cartCount = sessionStorage.getItem("cartCount");
  cartCount = parseInt(cartCount);

  if (cartCount) {
    cartNumber.textContent = cartCount;
  } else {
    cartNumber.textContent = 0;
  }
}

checkCart();
