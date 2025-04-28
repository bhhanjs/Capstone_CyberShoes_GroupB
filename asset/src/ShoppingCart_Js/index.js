let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  let cartItemsContainer = document.getElementById("cart-items");
  let cartTotalContainer = document.getElementById("cart-total");
  let cartItemCount = document.getElementById("cart-item-count");

  if (!cartItemsContainer || !cartTotalContainer || !cartItemCount) return;

  cartItemsContainer.innerHTML = "";

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    cartItemsContainer.innerHTML += `
      <div class="cart-item d-flex border-bottom py-3">
    <img
      src="${item.image}"
      class="item-image img-fluid"
      alt="${item.name}"
      style="max-width: 120px; height: auto"
    />

    <div class="item-info ms-3 d-flex flex-column justify-content-between">
      <h2 class="h5">${item.name}</h2>
      <p class="mb-2">Size: ${item.size}</p>

      <div class="quantity-control d-flex align-items-center">
        <button
          class="btn btn-outline-secondary btn-sm"
          onclick="decreaseQuantity(${index})"
        >
          -
        </button>
        <span class="mx-2">${item.quantity}</span>
        <button
          class="btn btn-outline-secondary btn-sm"
          onclick="increaseQuantity(${index})"
        >
          +
        </button>
      </div>

      <div class="item-actions mt-2">
        <a href="#" onclick="removeItem(${index})" class="text-danger">Xóa</a>
      </div>
    </div>

    <div class="item-price ms-auto align-self-center fs-5">
      ${(item.price * item.quantity).toLocaleString()} ₫
    </div>
  </div>

    `;
  });

  cartItemCount.textContent = `${cart.length} ITEMS`;
  cartTotalContainer.innerHTML = `
    <div class="summary-container mt-4 p-3 border rounded-3 shadow-sm">
  <div class="summary-row d-flex justify-content-between mb-2">
    <span>Tạm tính</span>
    <span>${total.toLocaleString()} ₫</span>
  </div>
  <div class="summary-row d-flex justify-content-between mb-2">
    <span>Vận chuyển</span>
    <span class="text-success">Miễn phí</span>
  </div>
  <div class="summary-row d-flex justify-content-between mb-2">
    <span class="fw-bold">Tổng cộng</span>
    <span class="fw-bold fs-5">${total.toLocaleString()} ₫</span>
  </div>
</div>
  `;
  localStorage.setItem("cart", JSON.stringify(cart));
}

window.increaseQuantity = function (index) {
  cart[index].quantity++;
  renderCart();
};

window.decreaseQuantity = function (index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }
  renderCart();
};

window.removeItem = function (index) {
  cart.splice(index, 1);
  renderCart();
};

renderCart();
