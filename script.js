// script.js

let products = [];
let cart = {}; // {productId: count}
let totalCost = 0;
const ADMIN_CODE = "2004";

// ===================================
// 1. پروڈکٹ لوڈنگ اور ڈسپلے
// ===================================

async function loadProducts() {
    try {
        // products.json سے ڈیٹا لوڈ کریں
        const response = await fetch('products.json');
        if (!response.ok) throw new Error('Could not load products.json');
        products = await response.json();
        renderProductGrid();
    } catch (error) {
        console.error("Error loading products:", error);
        document.getElementById('product-grid').innerHTML = '<p style="text-align: center; color: red;">اشیاء لوڈ نہیں ہو سکیں۔</p>';
    }
}

function renderProductGrid() {
    const grid = document.getElementById('product-grid');
    if (!grid) return; // اگر admin.html پر ہے تو رک جائیں

    grid.innerHTML = products.map(product => `
        <div class="product-item" onclick="openModal(${product.id})">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-item-details">
                <h4>${product.name}</h4>
                <p class="price">₨ ${product.price.toLocaleString('ur-PK')}</p>
            </div>
        </div>
    `).join('');
}

// ===================================
// 2. ماڈل (بڑی تصویر) فنکشنلٹی
// ===================================

function openModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('product-modal');
    document.getElementById('modal-image').src = product.image;
    document.getElementById('modal-name').textContent = product.name;
    document.getElementById('modal-desc').textContent = product.desc;
    
    // قیمت کو بڑا دکھانا
    document.getElementById('modal-small-price').textContent = `₨ ${product.price.toLocaleString('ur-PK')}`;
    document.getElementById('modal-large-price').textContent = `₨ ${product.price.toLocaleString('ur-PK')}`;
    
    document.getElementById('add-to-cart-btn').dataset.productId = product.id;
    
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

// ===================================
// 3. کارٹ (ٹوکری) فنکشنلٹی
// ===================================

function addToCart(productId) {
    const id = parseInt(productId);
    cart[id] = (cart[id] || 0) + 1;
    updateCartDisplay();
    closeModal();
    // شو کارٹ ویو خودکار طریقے سے
    showCart();
}

function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartCountSpan = document.getElementById('cart-count');
    const checkoutButton = document.getElementById('checkout-button');
    const emptyMsg = document.getElementById('empty-cart-msg');
    
    let html = '';
    totalCost = 0;
    let itemCount = 0;

    for (const id in cart) {
        const product = products.find(p => p.id === parseInt(id));
        const count = cart[id];
        if (product && count > 0) {
            const itemTotal = product.price * count;
            totalCost += itemTotal;
            itemCount += count;
            
            html += `
                <div class="cart-item">
                    <div class="item-details">
                        <p><strong>${product.name}</strong> x ${count}</p>
                        <p class="small-price">فی آئٹم: ₨ ${product.price.toLocaleString('ur-PK')}</p>
                    </div>
                    <div class="item-actions">
                        <p>ٹوٹل: ₨ ${itemTotal.toLocaleString('ur-PK')}</p>
                    </div>
                </div>
            `;
        }
    }

    cartItemsDiv.innerHTML = html;
    document.getElementById('cart-total').textContent = `₨ ${totalCost.toLocaleString('ur-PK')}`;
    cartCountSpan.textContent = itemCount;
    document.querySelector('.pay-button').textContent = `₨ ${totalCost.toLocaleString('ur-PK')} ادائیگی کریں`;

    if (itemCount > 0) {
        checkoutButton.disabled = false;
        emptyMsg.style.display = 'none';
    } else {
        checkoutButton.disabled = true;
        emptyMsg.style.display = 'block';
    }
}

// ===================================
// 4. ویو سوئچنگ (SPA)
// ===================================

function switchView(viewId) {
    document.querySelectorAll('.active-view, .hidden-view').forEach(el => {
        el.classList.add('hidden-view');
        el.classList.remove('active-view');
    });
    
    const target = document.getElementById(viewId);
    if (target) {
        target.classList.add('active-view');
        target.classList.remove('hidden-view');
    }
}

function showCart() {
    switchView('cart-view');
    updateCartDisplay();
    updateDeliveryTime();
}

function showCheckout() {
    switchView('checkout-view');
    document.getElementById('final-total').textContent = `₨ ${totalCost.toLocaleString('ur-PK')}`;
    document.getElementById('final-time').textContent = document.getElementById('delivery-estimate-time').textContent;
}

// ===================================
// 5. ڈیلیوری ٹائم اور آرڈر پروسیسنگ
// ===================================

function updateDeliveryTime() {
    const hours = parseInt(document.getElementById('deliveryTime').value);
    const date = new Date();
    date.setHours(date.getHours() + hours);
    
    const estimate = date.toLocaleString('ur-PK', {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'short'
    });
    document.getElementById('delivery-estimate-time').textContent = estimate;
}

// ان پٹ فیلڈ میں تبدیلی پر ٹائم اپڈیٹ کریں
document.addEventListener('DOMContentLoaded', () => {
    const timeInput = document.getElementById('deliveryTime');
    if (timeInput) {
        timeInput.addEventListener('input', updateDeliveryTime);
    }
});

// آرڈر پروسیسنگ (فرضی)
function processOrder(event) {
    event.preventDefault();

    // یہاں آپ کا پیمنٹ اور اکاؤنٹ کا بیک اینڈ کوڈ آئے گا
    
    const orderDetails = {
        items: cart,
        total: totalCost,
        paymentCard: document.getElementById('cardNumber').value, // فرضی ڈیٹا
        deliveryTime: document.getElementById('deliveryTime').value + ' گھنٹے',
        timeOfOrder: new Date().toLocaleString('ur-PK')
    };

    alert("✅ ادائیگی کامیاب (فرضی)! آپ کا آرڈر کامیابی سے بھیج دیا گیا ہے۔ ایڈمن کو اطلاع کر دی گئی ہے۔");
    console.log("آرڈر بھیجا گیا:", orderDetails);

    // ایڈمن کو نوٹیفکیشن بھیجنے کی نقل
    simulateAdminNotification(orderDetails);
    
    // کارٹ خالی کریں اور ہوم پر واپس جائیں
    cart = {};
    updateCartDisplay();
    switchView('product-view');
}

// ===================================
// 6. ایڈمن لاجک (نوٹیفیکیشن)
// ===================================

function handleAdminLogin(event) {
    event.preventDefault();
    const codeInput = document.getElementById('adminCode').value;
    const message = document.getElementById('loginMessage');
    const adminContainer = document.querySelector('.admin-container');

    if (codeInput === ADMIN_CODE) {
        message.textContent = "لاگ ان کامیاب!";
        message.style.color = 'green';
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('order-notifications').style.display = 'block';
        adminContainer.innerHTML = '<h2>🔔 نئے آرڈرز</h2><div id="pending-orders"><p style="text-align: center;">کوئی نیا آرڈر نہیں ہے۔</p></div>';
        // لاگ ان کے بعد نوٹیفکیشن دکھانے کے لیے
        renderAdminOrders(); 
    } else {
        message.textContent = "غلط کوڈ۔";
        message.style.color = 'red';
    }
}

function simulateAdminNotification(order) {
    // ایک فرضی آرڈر کو لوکل اسٹوریج میں محفوظ کریں
    let orders = JSON.parse(localStorage.getItem('pendingOrders')) || [];
    orders.push(order);
    localStorage.setItem('pendingOrders', JSON.stringify(orders));
    
    // اگر ایڈمن پیج کھلا ہے تو اپڈیٹ کریں
    if (document.getElementById('pending-orders')) {
        renderAdminOrders();
    }
}

function renderAdminOrders() {
    const ordersDiv = document.getElementById('pending-orders');
    if (!ordersDiv) return;

    let orders = JSON.parse(localStorage.getItem('pendingOrders')) || [];

    if (orders.length === 0) {
        ordersDiv.innerHTML = '<p style="text-align: center;">کوئی نیا آرڈر نہیں ہے۔</p>';
        return;
    }

    ordersDiv.innerHTML = orders.map((order, index) => `
        <div class="admin-order-item" style="border: 1px solid #ffc107; padding: 15px; margin-bottom: 10px; border-radius: 5px;">
            <p><strong>آرڈر نمبر: ${index + 1}</strong></p>
            <p><strong>ٹوٹل قیمت: ₨ ${order.total.toLocaleString('ur-PK')}</strong></p>
            <p>آرڈر کا وقت: ${order.timeOfOrder}</p>
            <p>متوقع ڈیلیوری: ${order.deliveryTime}</p>
            <p>کارڈ نمبر (آخری 4): ****${order.paymentCard.slice(-4)}</p>
            <button onclick="handleOrderAction(${index}, 'accept')" style="background-color: green; color: white; margin-left: 10px;">قبول کریں</button>
            <button onclick="handleOrderAction(${index}, 'reject')" style="background-color: red; color: white;">رد کریں</button>
        </div>
    `).join('');
}

function handleOrderAction(index, action) {
    let orders = JSON.parse(localStorage.getItem('pendingOrders')) || [];
    const order = orders[index];
    
    alert(`آرڈر نمبر ${index + 1} کو ${action === 'accept' ? 'قبول' : 'رد'} کر دیا گیا ہے۔`);
    console.log(`آرڈر ${order.total} کو ${action} کیا گیا۔`);
    
    // آرڈر کو لسٹ سے ہٹائیں
    orders.splice(index, 1); 
    localStorage.setItem('pendingOrders', JSON.stringify(orders));
    renderAdminOrders();
}


// جب پیج لوڈ ہو تو پروڈکٹس لوڈ کریں
document.addEventListener('DOMContentLoaded', loadProducts);
