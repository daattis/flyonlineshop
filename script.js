let cart = [];
let currentButton = document.querySelectorAll(".btn");

for (var i = 0; i < currentButton.length;  i++) {
    document.querySelectorAll(".btn")[i].addEventListener("click", function () {
        let currentProduct = this.id;
        cart.push(currentProduct);

        
    });
    
}