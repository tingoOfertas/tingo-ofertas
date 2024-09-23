function formatText(text) {
    // Convertir saltos de línea en <br>
    text = text.replace(/\n/g, '<br>');

    // Detectar enlaces y convertirlos en etiquetas <a>
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    text = text.replace(urlRegex, function(url) {
        return `<a href="${url}" target="_blank">${url}</a>`;
    });

    // Convertir *texto* en <strong> (negrita)
    text = text.replace(/\*([^\*]+)\*/g, '<strong>$1</strong>');

    // Convertir _texto_ en <em> (cursiva)
    text = text.replace(/_([^_]+)_/g, '<em>$1</em>');

    // Convertir ~texto~ en <del> (tachado)
    text = text.replace(/~([^~]+)~/g, '<del>$1</del>');

    return text;
}

// Example of using the function in your product description rendering
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

        // Manejo de la descripción con "Leer más"
        const descripcionCompleta = product.Descripción || 'Descripción no disponible';
        const formattedDescription = formatText(descripcionCompleta);  // Aplicamos la función de formato
        const maxLength = 100; // Número máximo de caracteres antes de truncar
        let descripcionTruncada = formattedDescription;
        let leerMasLink = '';

        if (descripcionCompleta.length > maxLength) {
            descripcionTruncada = formatText(descripcionCompleta.substring(0, maxLength)) + '... ';
            leerMasLink = `<a href="javascript:void(0);" class="read-more">Leer más</a>`;
        }

        const productCard = `
            <div class="product-card">
                <div class="media-container">
                    ${mediaContent}  <!-- Mostramos solo lo que esté disponible -->
                </div>
                <div class="product-card-body">
                    <h2>${product['Nombre del producto']}</h2>
                    <div class="price">s/${product.Precio}</div>
                    ${wholesalePrice}  <!-- Mostrar precio por mayor si está disponible -->
                    <p class="product-description" data-full-description="${descripcionCompleta}">
                        ${descripcionTruncada}
                        ${leerMasLink}
                    </p>
                    <button class="btn add-to-cart-button" onclick="toggleCartItem('${product['Nombre del producto']}', '${product.Precio}', this)">
                        <i class="fas fa-cart-plus"></i> Agregar al Carrito
                    </button>
                </div>
            </div>`;
        container.insertAdjacentHTML('beforeend', productCard);  // Añadimos cada producto al contenedor
    });

    // Delegación de eventos para "Leer más" y "Leer menos"
    container.addEventListener('click', function(event) {
        if (event.target.classList.contains('read-more')) {
            const descripcionElemento = event.target.parentElement;
            const descripcionCompleta = descripcionElemento.getAttribute('data-full-description');
            const maxLength = 100;

            if (event.target.textContent === 'Leer más') {
                descripcionElemento.innerHTML = formatText(descripcionCompleta) + ' <a href="javascript:void(0);" class="read-more">Leer menos</a>';
            } else {
                const descripcionTruncada = formatText(descripcionCompleta.substring(0, maxLength)) + '... ';
                descripcionElemento.innerHTML = descripcionTruncada + '<a href="javascript:void(0);" class="read-more">Leer más</a>';
            }
        }
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
