/*Lógica de API y carga de productos */
const apiEndpoint = 'https://sheetdb.io/api/v1/jcf3t9indw0pe';
let products = [];

const loadProducts = async (category = '') => {
    try {
        const response = await fetch(apiEndpoint);
        products = await response.json();
        console.log(products);  // Verificar si se están recibiendo los productos
        products = products.reverse();  // Si quieres invertir el orden
        displayProducts(category);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
};
