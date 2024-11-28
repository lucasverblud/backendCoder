const productsList = document.getElementById("products-list");
const btnRefreshproductsList = document.getElementById("btn-refresh-products-list");

const loadproductsList = async () => {
    const response = await fetch("/api/products", { method: "GET" });
    const data = await response.json();
    const products = data.payload;

    productsList.innerText = "";

    products.forEach((product) => {
        productsList.innerHTML += `<li>Id: ${product.id} - Nombre: ${product.title} - Descripcion: ${product.description} - Codigo: ${product.code} - Precio: ${product.price} - Status: ${product.status} - Stock: ${product.stock} - Categoria: ${product.category}</li>`;
    });
};

btnRefreshproductsList.addEventListener("click", () => {
    loadproductsList();
    console.log("¡Lista recargada!");
});

// Se ejecuta para cargar la lista de productes al ingresar o refrescar
loadproductsList();