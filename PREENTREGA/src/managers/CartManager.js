import paths from "../utils/paths.js";
import { readJsonFile, writeJsonFile } from "../utils/fileHandler.js";
import { generateId } from "../utils/collectionHandler.js";
import ErrorManager from "./ErrorManager.js";

export default class CartManager {
    #jsonFilename;
    #carts;

    constructor() {
        this.#jsonFilename = "carts.json";
    }

    // Busca cart por su ID
    async #findOneById(id) {
        this.#carts = await this.getAll();
        const cartFound = this.#carts.find((item) => item.id === Number(id));

        if (!cartFound) {
            throw new ErrorManager("ID no encontrado", 404);
        }

        return cartFound;
    }

    // Obtiene una lista de carts
    async getAll() {
        try {
            this.#carts = await readJsonFile(paths.files, this.#jsonFilename);
            return this.#carts;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Obtiene cart específica por su ID
    async getOneById(id) {
        try {
            const cartFound = await this.#findOneById(id);
            return cartFound;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Inserta cart
    async insertOne(data) {
        try {
            const products = data?.products?.map((item) => {
                return { product: Number(item.product), quantity: 1 };
            });

            const cart = {
                id: generateId(await this.getAll()),
                products: products ?? [],
            };

            this.#carts.push(cart);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#carts);

            return cart;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Método público para validar si el producto existe
    async #validateProductExists(productId) {
        const products = await readJsonFile(paths.files, "products.json");
        return products.some(product => product.id === Number(productId));
    }   

    // Agrega un product a una cart o incrementa la cantidad de un product existente
    addOneProduct = async (id, productId) => {
        try {
            const cartFound = await this.#findOneById(id);
    
            // Validar que el producto exista antes de agregarlo al carrito
            const productExists = await this.#validateProductExists(productId);
            if (!productExists) {
                throw new ErrorManager("Producto no encontrado", 404);
            }
    
            const productIndex = cartFound.products.findIndex((item) => item.product === Number(productId));
    
            if (productIndex >= 0) {
                cartFound.products[productIndex].quantity++;
            } else {
                cartFound.products.push({ product: Number(productId), quantity: 1 });
            }
    
            const index = this.#carts.findIndex((item) => item.id === Number(id));
            this.#carts[index] = cartFound;
            await writeJsonFile(paths.files, this.#jsonFilename, this.#carts);
    
            return cartFound;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    };
}