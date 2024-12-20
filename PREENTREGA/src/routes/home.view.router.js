import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";
import CartManager from "../managers/cartManager.js"; 


const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

router.get("/", async (req, res) => {
    try {
        res.render("home", { title: "Inicio" });
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

router.get("/realTimeProducts", async (req, res) => {
    try {
        res.render("realTimeProducts", { title: "Tiempo Real" });
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

// Ruta para listar productos con paginación
router.get("/products", async (req, res) => {
    try {
        const { page = 1, limit = 10, sort } = req.query;

        const products = await productManager.getAll({ page, limit, sort });

        res.render("index", {
            title: "Productos",
            products: products.docs, // Productos obtenidos
            pagination: {
                totalPages: products.totalPages,
                currentPage: products.page,
                hasNextPage: products.hasNextPage,
                hasPrevPage: products.hasPrevPage,
                nextPage: products.nextPage,
                prevPage: products.prevPage,
            },
        });
    } catch (error) {
        res.status(500).render("error", { error: error.message });
    }
});

// Ruta para ver los detalles de un producto por su ID
router.get("/products/:pid", async (req, res) => {
    try {
        const productId = req.params.pid;
        const product = await productManager.getOneById(productId);

        if (!product) {
            return res.status(404).render("productDetails", { error: "Producto no encontrado" });
        }

        res.render("productDetails", {
            title: `Detalles de ${product.title}`,
            product,
        });
    } catch (error) {
        res.status(500).render("error", { error: error.message });
    }
});

// Nueva ruta para renderizar el carrito por ID
router.get("/cart/:id", async (req, res) => {
    try {
        // Reutiliza la lógica de cartManager
        const cart = await cartManager.getOneById(req.params.id);

        if (!cart) {
            return res.status(404).render("cart", { error: "Carrito no encontrado", title: "Carrito de Compras" });
        }

        // Renderiza la vista con los datos del carrito
        res.render("cart", { cart, title: "Carrito de Compras" });
    } catch (error) {
        res.status(500).render("cart", { error: "Error al cargar el carrito", title: "Carrito de Compras" });
    }
});

export default router;