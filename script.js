//check if the page is done loading
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  let removeButton = document.getElementsByClassName("btn-danger");
  for (var i = 0; i < removeButton.length; i++) {
    let button = removeButton[i];
    button.addEventListener("click", removeCartItem);
  }

  let quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  let addToCartButtons = document.getElementsByClassName("addtocart");
  for (var i = 0; i < addToCartButtons.length; i++) {
    let button = addToCartButtons[i];
    button.addEventListener("click", addtoCartClicked);
  }

  checkoutButton = document
    .getElementsByClassName("checkout-btn")[0]
    .addEventListener("click", checkoutClicked);
}

function checkoutClicked() {
  alert("Thank you for your purchase.");
  let cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateTotalPrice();
}

function addtoCartClicked(event) {
  let button = event.target;
  let product = button.parentElement.parentElement;
  let title = product.getElementsByClassName("card-title")[0].innerText;
  let thumbnail = product.getElementsByClassName("product-image")[0].src;
  let price = product.getElementsByClassName("product-price")[0].innerText;

  addItemToCart(title, price, thumbnail);
}

//Add a div to the cart
function addItemToCart(title, price, thumbnail) {
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  cartRow.innerText = title;
  let cartItems = document.getElementsByClassName("cart-items")[0];

  //check if the same item already exists in the cart. if so, alert and exit the function
  let cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item is already added to your shopping cart.");
      return;
    }
  }

  let cartRowContents = `
  <div class="cart-item cart-column">
              <img
                class="cart-item-image"
                src="${thumbnail}"
                width="100"
                height="100"
              />
              <span class="cart-item-title">${title}</span>
            </div>
            <span class="cart-price cart-column">${price + " €"}</span>
            <div class="cart-quantity cart-column">
              <input class="quantity-inp" type="number" value="1" />
              <button class="btn btn-danger" type="button">REMOVE</button>
            </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);

  // add event listeners to rows created after page downloaded
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);

  cartRow
    .getElementsByClassName("quantity-inp")[0]
    .addEventListener("change", quantityChanged);

  updateTotalPrice();
}

function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateTotalPrice();
}
function quantityChanged(event) {
  let input = event.target;
  // check if quantity is correct
  if (isNaN(input.value) || input.value < 1) {
    input.value = 1;
  }
  updateTotalPrice();
}

function updateTotalPrice() {
  let cartItemContainer = document.getElementsByClassName("cart-items")[0];
  let cartRows = cartItemContainer.getElementsByClassName("cart-row");
  let total = 0;

  for (i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("cart-price")[0];
    let quantityElement = cartRow.getElementsByClassName("quantity-inp")[0];
    let price = parseFloat(priceElement.innerText.replace("€", ""));
    let quantity = quantityElement.value;

    total = total + price * quantity;
  }
  //round the total to a number with 2 decimals
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("cart-total-price")[0].innerText =
    total + " €";
}
