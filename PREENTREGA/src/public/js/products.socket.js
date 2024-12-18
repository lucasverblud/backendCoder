const socket = io();

const productsList = document.getElementById("products-list");
const productsForm = document.getElementById("products-form");
const inputproductId = document.getElementById("input-product-id");
const btnDeleteproduct = document.getElementById("btn-delete-product");
const errorMessage = document.getElementById("error-message");

socket.on("products-list", (data) => {
    const products = data.products.docs ?? [];
    productsList.innerText = "";

    products.forEach((product) => {
        productsList.innerHTML += `<li>Id: ${product.id} - Nombre: ${product.title} - Descripcion: ${product.description} - Codigo: ${product.code} - Precio: ${product.price} - Status: ${product.status} - Stock: ${product.stock} - Categoria: ${product.category}</li>`;
    });
});

productsForm.onsubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    errorMessage.innerText = "";

    form.reset();

    socket.emit("insert-product", {
        title: formData.get("title"),
        description: formData.get("description"),
        code: formData.get("code"),
        price: formData.get("price"),
        status: formData.get("status") || "off",
        stock: formData.get("stock"),
        category: formData.get("category"),
    });
};

btnDeleteproduct.onclick = () => {
    const id = inputproductId.value;
    inputproductId.value = "";
    errorMessage.innerText = "";
    if (id) {
        socket.emit("delete-product", { id });
    }
};

socket.on("error-message", (data) => {
    errorMessage.innerText = data.message;
});