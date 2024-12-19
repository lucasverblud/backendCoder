const productsList = document.getElementById("products-list");
const btnRefreshproductsList = document.getElementById("btn-refresh-products-list");
const btnSortAsc = document.getElementById("btn-sort-asc");
const btnSortDesc = document.getElementById("btn-sort-desc");

// Función para cargar los productos, con la opción de ordenarlos
const loadproductsList = async (sortOrder = '') => {
    const response = await fetch(`/api/products${sortOrder}`, { method: "GET" });   
    const data = await response.json();
    const products = data.payload.docs;

    // Limpiar la lista antes de agregar los nuevos productos
    productsList.innerHTML = "";

    // Recorrer los productos y agregar los elementos de lista
    products.forEach((product) => {
        productsList.innerHTML += `<li>Id: ${product.id} - Nombre: ${product.title} - Precio: ${product.price}</li>`;
    });
};

// Recargar la lista de productos al hacer clic en "Recargar Lista"
btnRefreshproductsList.addEventListener("click", () => {
    loadproductsList();
    console.log("¡Lista recargada!");
});

// Ordenar los productos en orden ascendente
btnSortAsc.addEventListener("click", () => {
    loadproductsList('?sort=asc');  // '1' es para orden ascendente
    console.log("Ordenando Ascendente");
});

// Ordenar los productos en orden descendente
btnSortDesc.addEventListener("click", () => {
    loadproductsList('?sort=desc'); // '-1' es para orden descendente
    console.log("Ordenando Descendente");
});

// Cargar la lista de productos cuando se ingrese o recargue la página
loadproductsList();
