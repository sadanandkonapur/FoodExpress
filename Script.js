// ===== CART DATA =====
let cart = [];

// ===== ADD TO CART =====
function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  renderCart();
}

// ===== RENDER CART =====
function renderCart() {
  const cartItems = document.getElementById('cart-items');
  let total = 0;

  cartItems.innerHTML = '';

  cart.forEach(item => {
    total += item.price * item.qty;
    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name} - ₹${item.price}</span>
        <div class="quantity-control">
          <button onclick="updateQty('${item.name}', -1)">-</button>
          <span>${item.qty}</span>
          <button onclick="updateQty('${item.name}', 1)">+</button>
        </div>
      </div>
    `;
  });

  document.getElementById('total').textContent = total;
  document.getElementById('cartCount').textContent = cart.length;
}

// ===== UPDATE QUANTITY =====
function updateQty(name, change) {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.qty += change;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.name !== name);
    }
    renderCart();
  }
}

// ===== CLEAR CART =====
document.getElementById('clearCart').addEventListener('click', () => {
  cart = [];
  renderCart();
});

// ===== SEARCH FILTER =====
document.getElementById('searchBar').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  document.querySelectorAll('.item').forEach(item => {
    const name = item.querySelector('h3').textContent.toLowerCase();
    item.style.display = name.includes(query) ? '' : 'none';
  });
});

// ===== CLEAR SEARCH =====
document.getElementById('clearSearch').addEventListener('click', () => {
  const searchBar = document.getElementById('searchBar');
  searchBar.value = '';
  searchBar.dispatchEvent(new Event('input'));
});
