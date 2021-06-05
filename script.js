const products = [
  {
    title: "Ambulance",
    description: "Big fly to start the season on colored water",
    image: "images/tubefly1.jpeg",
    price: 19.99,
  },
  {
    title: "Silvergrey",
    description: "Must have in northern clear waters",
    image: "images/tubefly2.jpeg",
    price: 14.99,
  },
  {
    title: "Yellow variant",
    description: "Seatrout special turned to salmon fly",
    image: "images/tubefly3.jpeg",
    price: 11.99,
  },
  {
    title: "Phata, Sillen, Mikkeli, WG",
    description: "Big 4 to fresh runners at June",
    image: "images/tubefly4.jpeg",
    price: 39.99,
  },
  {
    title: "MikkeliBlue",
    description: "These are legendary night time flies for salmon or big trout",
    image: "images/tubefly5.jpeg",
    price: 14.99,
  },
  {
    title: "Colored set",
    description: "At Autumn to fresh seatrouts in rivers",
    image: "images/tubefly6.jpeg",
    price: 24.99,
  },
  {
    title: "Pahtagorva",
    description: "Set includes different sizes flies for optimize the Moment",
    image: "images/tubefly7.jpeg",
    price: 39.99,
  },
  {
    title: "MikkeliBLue XL",
    description:
      "Bigger ones Mikkeliblues than item five, for big fish at night",
    image: "images/tubefly8.jpeg",
    price: 16.99,
  },
  {
    title: "Samurai",
    description:
      "Evolution of Legendary SunrayShadow. Floating line and some speed to line...",
    image: "images/tubefly9.jpeg",
    price: 14.99,
  },
  {
    title: "SpringFly",
    description: "You need only one fly in april and this is the one",
    image: "images/tubefly10.jpeg",
    price: 11.99,
  },
  {
    title: "Copper Pahtakorva",
    description: "This is the one to that deep pool",
    image: "images/tubefly11.jpeg",
    price: 14.99,
  },
  {
    title: "Bomber",
    description:
      "Fishing with floating line and need to get bit deeper, this is it",
    image: "images/tubefly12.jpeg",
    price: 9.99,
  },
  {
    title: "Phatagorva set",
    description:
      "Large set of Phatas, therse will do it, if don`t tehre`s no fish",
    image: "images/tubefly13.jpeg",
    price: 99.99,
  },
];

//check if the page is done loading
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  
//Render products

for (var i = 0; i < products.length; i++){
  let productTitle = products[i].title;
  let productImage = products[i].image;
  let productPrice = products[i].price;
  let productDesc = products[i].description;
  
  let newCard = document.createElement("div"); 
  newCard.classList.add("pricing-column","col-lg-4","col-md-6","mb-4"); 
  let productRow = document.getElementById('products-row'); 
  let cardContent = ` 
  <div class="card-deck mb-3 text-center">
    <div class="card mb-4 shadow-sm">
      <a href="#!">
        <img
          class="card-img-top product-image"
          src="${productImage}"
          alt="tubefly 1"
        />
      </a>
      <div class="card-body">
        <h4 class="card-title"><a href="#!">${productTitle}</a></h4>
        <h5 class="product-price">${productPrice}</h5>
        <p class="card-text">
          ${productDesc}
        </p>
        <button
          type="button"
          class="addtocart btn btn-lg btn-block btn-outline-primary"
          id="1">
          Add to cart
        </button>
      </div>
    </div>
  </div>`
  
  newCard.innerHTML = cardContent;
  productRow.append(newCard);
  }


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

  checkoutButton = document.getElementsByClassName("checkout-btn")[0].addEventListener("click", checkoutClicked);
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



