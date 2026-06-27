// ================= CONFIGURAÇÃO =================
// Número do WhatsApp do Takita Sushi.
// Formato: 55 + DDD + número.
const WHATSAPP_NUMBER = "5592985194693";
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
    price: 37.90,
    image: "temaki3.png"
  },
  {
    id: 11,
    name: "Temaki Camarão Frito",
    category: "temaki",
    price: 37.90,
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
const pixKey = document.getElementById("pixKey");

if (copyPixBtn) {
  copyPixBtn.addEventListener("click", () => {
    pixKey.select();
    pixKey.setSelectionRange(0, 99999);

    const copied = document.execCommand("copy");

    if (copied) {
      showToast("Chave PIX copiada!");
    }
  })
};

const toast = document.getElementById("toast");

// ================= FORMATAR PREÇO =================
function formatCurrency(value) {
  if (typeof value !== "number") {
    return "Consultar";
  }

  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// ================= SALVAR CARRINHO =================
function saveCart() {
  localStorage.setItem("takita_cart", JSON.stringify(cart));
}

// ================= FILTRO DE CATEGORIAS =================
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.category;
    const productCards = document.querySelectorAll(".product-card");

    categoryButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    productCards.forEach((card) => {
      const productCategory = card.dataset.category;

      if (selectedCategory === "todos" || selectedCategory === productCategory) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// ================= ADICIONAR AO CARRINHO =================
addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productId = Number(button.dataset.id);
    addToCart(productId);
  });
});

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);

  if (!product) {
    showToast("Produto não encontrado.");
    return;
  }

  const itemInCart = cart.find((item) => item.id === productId);

  if (itemInCart) {
    itemInCart.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  saveCart();
  renderCart();
  showToast("Produto adicionado ao carrinho.");
  updateCartSummary();
}

// ================= RENDERIZAR CARRINHO =================
function renderCart() {
  if (!cartItems) return;

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <p class="empty-cart">
        Seu carrinho está vazio.
      </p>
    `;
  } else {
    cart.forEach((item) => {

      const itemTotal = typeof item.price === "number"
        ? formatCurrency(item.price * item.quantity)
        : "Consultar";

      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      cartItem.innerHTML = `
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}" />
        </div>

        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>${itemTotal}</p>

          <div class="cart-controls">
            <button
              class="qty-btn"
              type="button"
              data-action="decrease"
              data-id="${item.id}"
            >
              -
            </button>

            <span>${item.quantity}</span>

            <button
              class="qty-btn"
              type="button"
              data-action="increase"
              data-id="${item.id}"
            >
              +
            </button>

            <button
              class="remove-btn"
              type="button"
              data-action="remove"
              data-id="${item.id}"
            >
              remover
            </button>
          </div>
        </div>
      `;

            cartItems.appendChild(cartItem);
    });
  }

  updateCartSummary();
}



// ================= CONTROLES DO CARRINHO =================
// ================= CONTROLES DO CARRINHO =================
if (cartItems) {
  cartItems.addEventListener("click", (event) => {
    const button = event.target.closest("button");

    if (!button) return;

    const productId = Number(button.dataset.id);
    const action = button.dataset.action;

    if (action === "increase") {
      increaseQuantity(productId);
    }

    if (action === "decrease") {
      decreaseQuantity(productId);
    }

    if (action === "remove") {
      removeFromCart(productId);
    }
  });
}

function increaseQuantity(productId) {
  const item = cart.find((product) => product.id === productId);

  if (!item) return;

  item.quantity += 1;

  saveCart();
  renderCart();
  updateCartSummary();
}

function decreaseQuantity(productId) {
  const item = cart.find((product) => product.id === productId);

  if (!item) return;

  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart = cart.filter((product) => product.id !== productId);
  }

  saveCart();
  renderCart();
  updateCartSummary();
}


function removeFromCart(productId) {
  cart = cart.filter((product) => product.id !== productId);

  saveCart();
  renderCart();
  showToast("Produto removido do carrinho.");
  updateCartSummary();
}

function clearCart() {
  if (cart.length === 0) {
    showToast("O carrinho já está vazio.");
    return;
  }

  cart = [];

  saveCart();
  renderCart();
  showToast("Carrinho limpo.");
  updateCartSummary();
}

// ================= RESUMO DO CARRINHO =================
function updateCartSummary() {
  if (!cartCount || !cartTotal) return;

  const totalQuantity = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  const totalValue = cart.reduce((sum, item) => {
    if (typeof item.price !== "number") {
      return sum;
    }

    return sum + item.price * item.quantity;
  }, 0);


  
  const hasConsultItem = cart.some((item) => typeof item.price !== "number");

  cartCount.textContent = totalQuantity;

  if (cart.length === 0) {
    cartTotal.textContent = "R$ 0,00";
  } else if (hasConsultItem && totalValue > 0) {
    cartTotal.textContent = `${formatCurrency(totalValue)} + consultar`;
  } else if (hasConsultItem) {
    cartTotal.textContent = "Consultar";
  } else {
    cartTotal.textContent = formatCurrency(totalValue);
  }


}

// ================= ABRIR E FECHAR CARRINHO =================
function openCart() {
  if (!cartDrawer || !overlay) return;

  cartDrawer.classList.add("active");
  overlay.classList.add("active");
  document.body.classList.add("cart-open");
}

function closeCart() {
  if (!cartDrawer || !overlay) return;

  cartDrawer.classList.remove("active");

  if (!checkoutModal || !checkoutModal.classList.contains("active")) {
    overlay.classList.remove("active");
    document.body.classList.remove("cart-open");
  }
}

// ================= ABRIR E FECHAR MODAL =================
function openCheckoutModal() {
  if (cart.length === 0) {
    showToast("Adicione um produto antes de finalizar.");
    return;
  }

  if (!checkoutModal || !overlay || !cartDrawer) return;

  checkoutModal.classList.add("active");
  overlay.classList.add("active");
  cartDrawer.classList.remove("active");
  document.body.classList.add("cart-open");
}

function closeCheckoutModal() {
  if (!checkoutModal || !overlay || !cartDrawer) return;

  checkoutModal.classList.remove("active");

  if (!cartDrawer.classList.contains("active")) {
    overlay.classList.remove("active");
    document.body.classList.remove("cart-open");
  }
}

function closeAllPanels() {
  if (cartDrawer) {
    cartDrawer.classList.remove("active");
  }

  if (checkoutModal) {
    checkoutModal.classList.remove("active");
  }

  if (overlay) {
    overlay.classList.remove("active");
  }

  document.body.classList.remove("cart-open");
}

// ================= FINALIZAR PEDIDO =================
if (checkoutForm) {
  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      showToast("Seu carrinho está vazio.");
      return;
    };


    const customerName = document.getElementById("customerName").value.trim();
    const customerPhone = document.getElementById("customerPhone").value.trim();
    const customerAddress = document.getElementById("customerAddress").value.trim();
    const locationLink = document.getElementById("customerLocation")?.value || "";
    const paymentMethod = document.getElementById("paymentMethod").value;
    const customerNote = document.getElementById("customerNote").value.trim();
    const customerReference = document.getElementById("customerReference") .value.trim();
    console.log("Esse é o location link", locationLink)

   let totalValue = cart.reduce((sum, item) => {
  if (typeof item.price !== "number") {
    return sum;
  }

  return sum + item.price * item.quantity;
}, 0);

let taxValue = 0;

if (paymentMethod === "Cartão De Crédito") {
  taxValue = totalValue * 0.05;
}

totalValue += taxValue;

    const hasConsultItem = cart.some((item) => typeof item.price !== "number");

    const orderItems = cart
      .map((item) => {
        const itemPrice = typeof item.price === "number"
          ? formatCurrency(item.price * item.quantity)
          : "Consultar";

        return `${item.quantity}x ${item.name} - ${itemPrice}`;
      })
      .join("\n");

    let totalText = formatCurrency(totalValue);

    if (hasConsultItem && totalValue > 0) {
      totalText = `${formatCurrency(totalValue)} + item a consultar`;
    }

    if (hasConsultItem && totalValue === 0) {
      totalText = "Consultar";
    };
      
    const message = `
🍣 *NOVO PEDIDO - TAKITA SUSHI*

━━━━━━━━━━━━━━

👤 *CLIENTE*
Nome: ${customerName}
Telefone: ${customerPhone}

📍 *ENTREGA*
Endereço: ${customerAddress}
Referência: ${customerReference}
Localização: ${mapsLink2 || "Não enviada"}

━━━━━━━━━━━━━━

🛒 *ITENS*

${orderItems}

━━━━━━━━━━━━━━

💳 *PAGAMENTO*
Forma: ${paymentMethod}

💸 *TAXA*
${formatCurrency(taxValue)}

💰 *TOTAL*
${formatCurrency(totalValue)}

━━━━━━━━━━━━━━

📝 *OBSERVAÇÃO*
${customerNote || "Nenhuma"}
`;

console.log("LINK MAPA:", locationLink); {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    cart = [];
    saveCart();
    renderCart();
    checkoutForm.reset();
    closeAllPanels();
    updateCartSummary();

};


});
}
// ================= TOAST =================
function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("active");

  setTimeout(() => {
    toast.classList.remove("active");
  }, 3000);

}

// ================= CARROSSEL DE DESTAQUE DA HOME =================
const featuredItems = [
  {
    image: "barcaG.png",
    tag: "Destaque",
    name: "G Mista",
    price: "R$129,90",
    info: "Contém 55 un."
  },
  {
    image: "salmão_hot.png",
    tag: "Mais pedido",
    name: "Hot Holl",
    price: "R$27,90",
    info: "Philadelphia"
  },
  {
    image: "temaki (1).png",
    tag: "Especial",
    name: "Temaki",
    price: "R$36,90",
    info: "1 unidade"
  }
];

const featuredImage = document.getElementById("featuredImage");
const featuredTag = document.getElementById("featuredTag");
const featuredName = document.getElementById("featuredName");
const featuredPrice = document.getElementById("featuredPrice");
const featuredInfo = document.getElementById("featuredInfo");
const featuredDots = document.querySelectorAll("#featuredDots button");

let currentFeaturedIndex = 0;
let featuredInterval;

function updateFeatured(index) {
  const item = featuredItems[index];

  if (!item || !featuredImage) return;

  currentFeaturedIndex = index;

  featuredImage.classList.add("changing");

  setTimeout(() => {
    featuredImage.src = item.image;
    featuredImage.alt = item.name;

    if (featuredTag) featuredTag.textContent = item.tag;
    if (featuredName) featuredName.textContent = item.name;
    if (featuredPrice) featuredPrice.textContent = item.price;
    if (featuredInfo) featuredInfo.textContent = item.info;

    featuredDots.forEach((dot) => {
      dot.classList.remove("active");
    });

    if (featuredDots[index]) {
      featuredDots[index].classList.add("active");
    }

    featuredImage.classList.remove("changing");
  }, 220);
}

function nextFeatured() {
  const nextIndex = (currentFeaturedIndex + 1) % featuredItems.length;
  updateFeatured(nextIndex);
}

function startFeaturedCarousel() {
  featuredInterval = setInterval(nextFeatured, 3500);
}

function resetFeaturedCarousel() {
  clearInterval(featuredInterval);
  startFeaturedCarousel();
}

featuredDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = Number(dot.dataset.slide);

    updateFeatured(index);
    resetFeaturedCarousel();
  });
});

if (featuredImage) {
  startFeaturedCarousel();
}

// ================= EVENTOS =================
if (openCartBtn) {
  openCartBtn.addEventListener("click", openCart);
}

if (closeCartBtn) {
  closeCartBtn.addEventListener("click", closeCart);
}

if (clearCartBtn) {
  clearCartBtn.addEventListener("click", clearCart);
}

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", openCheckoutModal);
}

const paymentMethodSelect = document.getElementById("paymentMethod");

if (paymentMethodSelect) {
  paymentMethodSelect.addEventListener("change", () => {
    if (paymentMethodSelect.value === "Pix") {
      pixInfo.style.display = "block";
    } else {
      pixInfo.style.display = "none";
    }
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeCheckoutModal);
}

if (overlay) {
  overlay.addEventListener("click", closeAllPanels);
}

const customerAddressInput = document.getElementById("customerAddress"); 
let mapsLink2="";
if (getLocationBtn) {
  getLocationBtn.addEventListener("click", () => {
    console.log("Botão de localização clicado.");

    if (!navigator.geolocation) {
      showToast("Seu navegador não suporta localização.");
      console.log("Geolocation não existe no navegador.");
      return;
    }

    if (!window.isSecureContext) {
      showToast("Abra o site com HTTPS.");
      console.log("Site não está em contexto seguro:", window.location.href);
      return;
    }

    showToast("Buscando localização...");
    


    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Localização encontrada:", position);

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        console.log(mapsLink)
        mapsLink2=mapsLink;
        if (customerLocation) {
          customerLocation.value = mapsLink;
          console.log("Elemento:", customerLocation);
          console.log("Valor salvo:", customerLocation.value);
        }

        showToast("Localização adicionada.");
      },

      (error) => {
        console.log("Erro ao pegar localização:", error);

        if (error.code === error.PERMISSION_DENIED) {
          showToast("Permissão de localização negada.");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          showToast("Localização indisponível.");
        } else if (error.code === error.TIMEOUT) {
          showToast("Tempo esgotado. Tente novamente.");
        } else {
          showToast("Erro ao buscar localização.");
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 300000
      }
    );
  });
}
// ================= INICIALIZAÇÃO =================
renderCart();
updateCartSummary();
