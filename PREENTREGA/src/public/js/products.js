const productsList = document.getElementById("products-list");
const btnRefreshproductsList = document.getElementById("btn-refresh-products-list");

// Función para cargar los productos, con la opción de ordenarlos
const loadproductsList = async () => {
    const response = await fetch(`/api/products`, { method: "GET" });   
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

// Cargar la lista de productos cuando se ingrese o recargue la página
loadproductsList();
