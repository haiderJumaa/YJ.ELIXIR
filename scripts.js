document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsElement = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount'); // مكان عرض المجموع الكلي
    const checkoutButton = document.getElementById('checkout');
    const clearCartButton = document.getElementById('clear-cart');
    const whatsappNumber = 'YOUR_WHATSAPP_NUMBER'; // أدخل رقم WhatsApp الخاص بك هنا

    // تحديث عدد العناصر في السلة وحساب المجموع الكلي
    function updateCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCountElement.textContent = cart.length;

        let totalAmount = 0;
        cartItemsElement.innerHTML = '';
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - ${item.price} دينار`;
            cartItemsElement.appendChild(listItem);
            
            totalAmount += parseFloat(item.price); // حساب المجموع
        });
        totalAmountElement.textContent = totalAmount.toFixed(3); // تحديث المجموع الكلي
    }

    // التعامل مع زر "أضف إلى السلة"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.closest('.product');
            const productName = product.querySelector('h3').textContent;
            const productPrice = product.querySelector('.price').textContent;

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({ name: productName, price: productPrice });
            localStorage.setItem('cart', JSON.stringify(cart));

            updateCart();
        });
    });

    // إرسال رسالة عبر WhatsApp
    checkoutButton.addEventListener('click', function() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let message = 'طلب جديد:\n\n';
        cart.forEach(item => {
            message += `${item.name} - ${item.price} دينار\n`;
        });
        message += `\nالمجموع الكلي: ${totalAmountElement.textContent} دينار`;
        message += `\nرابط الموقع: ${window.location.href}`;

        const whatsappURL = `https://wa.me/${9647715584940}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    });

    // مسح السلة
    clearCartButton.addEventListener('click', function() {
        localStorage.removeItem('cart'); // إزالة السلة من localStorage
        updateCart(); // تحديث السلة
    });

    // عرض السلة عند تحميل الصفحة
    updateCart();
});

// إعدادات العرض التقديمي للشرائح
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slides");
    let dots = document.getElementsByClassName("dot");
    
    // إخفاء جميع الشرائح
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    slideIndex++;
    
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    // إزالة الفعالية من النقاط
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    
    // تبديل الشريحة كل 3 ثوانٍ
    setTimeout(showSlides, 3000);
}
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.className = 'toast show';
    }, 100);
    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
        setTimeout(() => document.body.removeChild(toast), 500);
    }, 3000);
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        let productElement = this.closest('.product');
        let name = productElement.querySelector('h3').textContent;
        showToast(`تم إضافة ${name} إلى السلة.`);
        // باقي كود إضافة إلى السلة
    });
});
function updateCart() {
    let cartCount = cartItems.length;
    let totalAmount = cartItems.reduce((total, item) => total + item.price, 0);
    
    document.getElementById('cart-count').textContent = cartCount;
    document.getElementById('total-amount').textContent = `${totalAmount.toLocaleString()} IQD`;
}
