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
        const response = await fetch('products.json');
        if (!response.ok) throw new Error('Could not load products.json');
        products = await response.json();
        renderProductGrid();
    } catch (error) {
        console.error("Error loading products:", error);
        const grid = document.getElementById('product-grid');
        if (grid) {
            grid.innerHTML = '<p style="text-align: center; color: red;">اشیاء لوڈ نہیں ہو سکیں۔</p>';
        }
    }
}

function renderProductGrid() {
    const grid = document.getElementById('product-grid');
    if (!grid) return; 

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
    
    if (!cartItemsDiv || !cartCountSpan || !checkoutButton || !emptyMsg) return;

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
        cartItemsDiv.style.display = 'block';
    } else {
        checkoutButton.disabled = true;
        emptyMsg.style.display = 'block';
        cartItemsDiv.style.display = 'none';
    }
}

// ===================================
// 4. ویو سوئچنگ (SPA)
// ===================================

function switchView(viewId) {
    document.querySelectorAll('.app-view').forEach(el => {
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
    const timeInput = document.getElementById('deliveryTime');
    const hours = parseInt(timeInput.value) || 0;
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

// آرڈر پروسیسنگ (فرضی)
function processOrder(event) {
    event.preventDefault();
    
    if (totalCost === 0) {
        alert("ٹوکری خالی ہے!");
        return;
    }

    const orderDetails = {
        items: cart,
        total: totalCost,
        paymentCard: document.getElementById('cardNumber').value,
        deliveryTime: document.getElementById('deliveryTime').value + ' گھنٹے',
        timeOfOrder: new Date().toLocaleString('ur-PK')
    };

    alert("✅ ادائیگی کامیاب (فرضی)! آپ کا آرڈر کامیابی سے بھیج دیا گیا ہے۔ ایڈمن کو اطلاع کر دی گئی ہے۔");

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
    
    const dashboardContent = document.getElementById('admin-dashboard-content');
    const loginForm = document.getElementById('login-form');

    if (codeInput === ADMIN_CODE) {
        message.textContent = "لاگ ان کامیاب!";
        message.style.color = 'green';
        
        // لاگ ان فارم کو چھپائیں
        loginForm.style.display = 'none';
        
        // ایڈمن ڈیش بورڈ کو دکھائیں
        dashboardContent.style.display = 'block';

        // آرڈرز کو فوراً لوڈ کریں
        renderAdminOrders();
        
    } else {
        message.textContent = "غلط کوڈ۔";
        message.style.color = 'red';
    }
}

function handleFileUpload(event) {
    event.preventDefault();
    const fileName = document.getElementById('newProductName').value;
    const uploadMessage = document.getElementById('fileUploadMessage');

    // ⚠️ نوٹ: یہاں حقیقی فائل اپ لوڈ کے لیے بیک اینڈ کوڈ شامل کرنا پڑے گا۔
    if (fileName) {
        uploadMessage.textContent = `✅ فولڈر/پروڈکٹ '${fileName}' کامیابی سے تیار (فرضی)! اصل فائلز اپ لوڈ کرنے کے لیے بیک اینڈ کی ضرورت ہے۔`;
        uploadMessage.style.color = 'green';
    } else {
        uploadMessage.textContent = `براہ کرم فولڈر کا نام بتائیں۔`;
        uploadMessage.style.color = 'red';
    }
}

function simulateAdminNotification(order) {
    // ایک فرضی آرڈر کو لوکل اسٹوریج میں محفوظ کریں
    let orders = JSON.parse(localStorage.getItem('pendingOrders')) || [];
    orders.push(order);
    localStorage.setItem('pendingOrders', JSON.stringify(orders));
    
    // ایڈمن پیج کو اپڈیٹ کریں اگر وہ کھلا ہو
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
        <div class="admin-order-item">
            <p><strong>آرڈر نمبر: ${index + 1}</strong></p>
            <p><strong>ٹوٹل قیمت: ₨ ${order.total.toLocaleString('ur-PK')}</strong></p>
            <p>آرڈر کا وقت: ${order.timeOfOrder}</p>
            <p>متوقع ڈیلیوری: ${order.deliveryTime}</p>
            <button onclick="handleOrderAction(${index}, 'accept')" style="background-color: #28a745; color: white;">قبول کریں</button>
            <button onclick="handleOrderAction(${index}, 'reject')" style="background-color: #dc3545; color: white;">رد کریں</button>
        </div>
    `).join('');
}

function handleOrderAction(index, action) {
    let orders = JSON.parse(localStorage.getItem('pendingOrders')) || [];
    const order = orders[index];
    
    alert(`آرڈر نمبر ${index + 1} کو ${action === 'accept' ? 'قبول' : 'رد'} کر دیا گیا ہے۔`);
    
    orders.splice(index, 1); 
    localStorage.setItem('pendingOrders', JSON.stringify(orders));
    renderAdminOrders();
}

// جب پیج لوڈ ہو تو پروڈکٹس لوڈ کریں
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    // اگر ایڈمن پیج پر ہیں تو لاجک ہینڈل کریں
    if (document.getElementById('login-form')) {
        document.getElementById('loginForm').addEventListener('submit', handleAdminLogin);
    }
});
