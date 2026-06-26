// ================= CONFIGURAÇÃO =================
const WHATSAPP_NUMBER = "5592985623962";
const PIX_KEY = "92985194693";

// ================= PRODUTOS =================
const products = [
  {
    id: 1,
    name: "Hot Holl Philadelphia",
    category: "hot-holl",
    price: 27.90,
    image: "salmão_hot.png"
  },
  {
    id: 2,
    name: "Hot Holl Butterfly",
    category: "hot-holl",
    price: 27.90,
    image: "hotholl2.png"
  },
  {
    id: 3,
    name: "Uramaki Salmão",
    category: "hossomaki",
    price: 29.90,
    image: "uramaki.png"
  },
  {
    id: 4,
    name: "Uramaki Camarão",
    category: "hossomaki",
    price: 29.90,
    image: "uramakicamarão.png"
  },
  {
    id: 5,
    name: "Hossomaki Salmão",
    category: "hossomaki",
    price: 29.90,
    image: "hossomaki.png"
  },
  {
    id: 6,
    name: "Temaki Salmão Cru",
    category: "temaki",
    price: 36.90,
    image: "temaki (1).png"
  },
  {
    id: 7,
    name: "Temaki Camarão Cru",
    category: "temaki",
    price: 39.90,
    image: "temakicamarão.png"
  },
  {
    id: 8,
    name: "Dog-Hot Salmão",
    category: "hot-holl",
    price: 34.90,
    image: "dog.png"
  },
  {
    id: 9,
    name: "Dog-Hot Camarão",
    category: "hot-holl",
    price: 34.90,
    image: "dog.png"
  },
  {
    id: 10,
    name: "Temaki Salmão Frito",
    category: "temaki",
    price: 34.90,
    image: "temaki3.png"
  },
  {
    id: 11,
    name: "Temaki Camarão Frito",
    category: "temaki",
    price: 34.90,
    image: "temakihot.png"
  },
  {
    id: 12,
    name: "P Mista",
    category: "barca",
    price: 59.90,
    image: "barcaG.png"
  },
  {
    id: 13,
    name: "M Mista",
    category: "barca",
    price: 79.90,
    image: "barcaG.png"
  },
  {
    id: 14,
    name: "G mista",
    category: "barca",
    price: 129.90,
    image: "barcaG.png"
  },
  {
    id: 15,
    name: "Barca G Hot",
    category: "barca",
    price: 99.90,
    image: "barcaG.png"
  },
  {
    id: 16,
    name: "Coca-Cola 2L",
    category: "bebidas",
    price: 14.90,
    image: "coca.png"
  },
  {
    id: 17,
    name: "Coca em lata 350ml",
    category: "bebidas",
    price: 5.90,
    image: "cocalata.png"
  },
  {
    id: 18,
    name: "Molho Tarê",
    category: "adicionais",
    price: 0.50,
    image: "tare.png"
  },
  {
    id: 19,
    name: "Molho Shoyu",
    category: "adicionais",
    price: 0.50,
    image: "shoyu.png"
  },
  {
    id: 20,
    name: "Uramaki Premium Salmão",
    category: "hossomaki",
    price: 34.90,
    image: "uramakipremium.png"
  },
  {
    id: 21,
    name: "Uramaki Premium Camarão",
    category: "hossomaki",
    price: 34.90,
    image: "uramakipremium.png"
  },
  {
    id: 22,
    name: "Barca M Hot",
    category: "barca",
    price: 79.90,
    image: "barcaG.png"
  },
  
];

// ================= ESTADO =================
let cart = JSON.parse(localStorage.getItem("takita_cart")) || [];

// ================= ELEMENTOS =================
const categoryButtons = document.querySelectorAll(".category-btn");
const addButtons = document.querySelectorAll(".add-btn");

const openCartBtn = document.getElementById("openCartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const clearCartBtn = document.getElementById("clearCartBtn");
const checkoutBtn = document.getElementById("checkoutBtn");

const checkoutModal = document.getElementById("checkoutModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const checkoutForm = document.getElementById("checkoutForm");

const getLocationBtn = document.getElementById("getLocationBtn");
const customerLocation = document.getElementById("customerLocation");

const pixInfo = document.getElementById("pixInfo");
const copyPixBtn = document.getElementById("copyPixBtn");

const toast = document.getElementById("toast");

// ================= UTIL =================
function formatCurrency(value) {
  if (typeof value !== "number") return "Consultar";
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function saveCart() {
  localStorage.setItem("takita_cart", JSON.stringify(cart));
}

// ================= CARRINHO =================
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return showToast("Produto não encontrado.");

  const item = cart.find((p) => p.id === productId);

  if (item) item.quantity++;
  else cart.push({ ...product, quantity: 1 });

  saveCart();
  renderCart();
  updateCartSummary();
  showToast("Produto adicionado ao carrinho.");
}

function renderCart() {
  if (!cartItems) return;
  cartItems.innerHTML = "";

  if (!cart.length) {
    cartItems.innerHTML = `<p class="empty-cart">Seu carrinho está vazio.</p>`;
    return;
  }

  cart.forEach((item) => {
    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>${formatCurrency(item.price * item.quantity)}</p>
        <button data-id="${item.id}" data-action="remove">Remover</button>
      </div>
    `;

    cartItems.appendChild(div);
  });
}

function updateCartSummary() {
  if (!cartCount || !cartTotal) return;

  const totalQty = cart.reduce((s, i) => s + i.quantity, 0);
  const totalVal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  cartCount.textContent = totalQty;
  cartTotal.textContent = formatCurrency(totalVal);
}

// ================= PIX =================
if (copyPixBtn) {
  copyPixBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      showToast("Chave PIX copiada!");
    } catch {
      showToast("Erro ao copiar PIX");
    }
  });
}

// ================= GEOLOCALIZAÇÃO =================
if (getLocationBtn) {
  getLocationBtn.addEventListener("click", () => {
    if (!navigator.geolocation) return showToast("Sem suporte a GPS");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const link = `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;
        if (customerLocation) customerLocation.value = link;
      },
      () => showToast("Erro ao obter localização")
    );
  });
}

// ================= FINALIZAR =================
if (checkoutForm) {
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!cart.length) return showToast("Carrinho vazio");

    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

    const message = `Pedido:\n${cart.map(i => `${i.quantity}x ${i.name}`).join("\n")}\nTotal: ${formatCurrency(total)}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

    cart = [];
    saveCart();
    renderCart();
    updateCartSummary();
  });
}

// ================= TOAST =================
function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("active");
  setTimeout(() => toast.classList.remove("active"), 3000);
}

// ================= INIT =================
renderCart();
updateCartSummary();
