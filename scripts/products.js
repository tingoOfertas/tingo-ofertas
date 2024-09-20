//product.js
const displayProducts = (category = '') => {
    const container = document.getElementById('product-container');
    container.innerHTML = '';  // Limpiamos el contenedor de productos

    const filteredProducts = category ? products.filter(product => product.Categoría === category) : products;

    filteredProducts.forEach(product => {
        // Creamos una variable para el contenido de medios (imagen y/o video)
        let mediaContent = '';

        // Si hay imagen, la añadimos al contenido
        if (product.Foto) {
            mediaContent += `<img class="product-image" src="${product.Foto}" alt="${product['Nombre del producto']}" />`;
        }

        // Si hay video, lo añadimos al contenido
        if (product.EnlaceVideo) {
            mediaContent += `<video controls class="product-video"><source src="${product.EnlaceVideo}" type="video/mp4"></video>`;
        }

        // Si no hay ni imagen ni video, mostramos un placeholder
        if (!product.Foto && !product.EnlaceVideo) {
            mediaContent = `<img class="product-image" src="https://via.placeholder.com/400" alt="Imagen no disponible" />`;
        }

        // Verificamos si hay precio por mayor
        const wholesalePrice = product['Precio por mayor'] ? `<div class="wholesale-price">Precio por mayor: s/${product['Precio por mayor']}</div>` : '';

        const productCard = `
            <div class="product-card">
                <div class="media-container">
                    ${mediaContent}  <!-- Mostramos solo lo que esté disponible -->
                </div>
                <div class="product-card-body">
                    <h2>${product['Nombre del producto']}</h2>
                    <div class="price">s/${product.Precio}</div>
                    ${wholesalePrice}  <!-- Mostrar precio por mayor si está disponible -->
                    <p>${product.Descripción || 'Descripción no disponible'}</p>
                    <button class="btn add-to-cart-button" onclick="toggleCartItem('${product['Nombre del producto']}', '${product.Precio}', this)">
                        <i class="fas fa-cart-plus"></i> Agregar al Carrito
                    </button>
                </div>
            </div>`;
        container.insertAdjacentHTML('beforeend', productCard);  // Añadimos cada producto al contenedor
    });

    // Ahora que los productos están generados, añadimos la lógica para el modal
    document.querySelectorAll(".product-image").forEach(img => {
        img.addEventListener("click", function() {
            // Abrir modal cuando se hace clic en la imagen
            const modal = document.getElementById("imageModal");
            const modalImg = document.getElementById("expandedImage");
            modal.style.display = "flex";  // Mostramos el modal
            modalImg.src = this.src;  // Ponemos la imagen clicada en el modal
        });
    });

    // Función para cerrar el modal cuando se hace clic en la "X"
    const closeModal = document.querySelector(".close-modal");
    closeModal.addEventListener("click", function() {
        const modal = document.getElementById("imageModal");
        modal.style.display = "none";  // Ocultamos el modal
    });
};


// Asegúrate de que los productos se carguen en cuanto la página esté lista
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

// Para filtrar productos por categoría 
window.filterProducts = (category) => {
    displayProducts(category);
};
