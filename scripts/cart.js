let cart = [];

const toggleCartItem = (name, price, button) => {
    const index = cart.findIndex(item => item.name === name);
    if (index === -1) {
        cart.push({ name, price: parseFloat(price), quantity: 1 });
        button.classList.add('remove');
        showNotification('Producto agregado al carrito');
        toggleModal();
    } else {
        cart[index].quantity++;
        showNotification('Cantidad del producto incrementada');
    }
    updateCartList();
};

const updateCartList = () => {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;

    cartList.innerHTML = `
        <li>
            <span>Producto</span>
            <span>Cantidad</span>
            <span>Precio Total</span>
        </li>`;

    cart.forEach(item => {
        const totalItemPrice = (item.price * item.quantity).toFixed(2);
        total += parseFloat(totalItemPrice);
        cartList.innerHTML += `
            <li>
                <span>${item.name}</span>
                <span class="quantity">
                    <button onclick="updateQuantity('${item.name}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity('${item.name}', 1)">+</button>
                </span>
                <span>s/${totalItemPrice}</span>
                <button class="remove-button" onclick="removeFromCart('${item.name}')">×</button>
            </li>`;
    });

    cartTotal.textContent = total.toFixed(2);
    updateWhatsAppLink(); // Actualiza el enlace de WhatsApp con los productos seleccionados
};

const updateQuantity = (name, delta) => {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(name); // Elimina el producto si la cantidad es 0 o menor
        } else {
            updateCartList(); // Actualiza la lista del carrito si se incrementa o decrementa
        }
    }
};

const removeFromCart = (name) => {
    cart = cart.filter(item => item.name !== name); // Filtra el producto por nombre
    updateCartList(); // Actualiza la lista del carrito
    showNotification('Producto eliminado del carrito');
};

// Función para redirigir a WhatsApp con el mensaje
const updateWhatsAppLink = () => {
    const buyButton = document.getElementById('buy-button');
    const whatsappNumber = "+51924710696"; // WhatsApp de Perú
    let message = "Hola, me gustaría comprar los siguientes productos:\n\n";

    cart.forEach(item => {
        message += `${item.quantity} x ${item.name} - s/${(item.price * item.quantity).toFixed(2)}\n`;
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    message += `\nTotal: s/${total}`;
    
    // Codifica el mensaje para URL
    const encodedMessage = encodeURIComponent(message);
    buyButton.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
};
