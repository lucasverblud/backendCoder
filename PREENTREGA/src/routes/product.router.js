import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";
import uploader from "../utils/uploader.js";

const router = Router();
const productManager = new ProductManager();

// Ruta para obtener los products
router.get("/", async (req, res) => {
    try {
        const products = await productManager.getAll(req.query);
        res.status(200).json({ status: "success", payload: products });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

// Ruta para obtener un product por su ID
router.get("/:id", async (req, res) => {
    try {
        const products = await productManager.getOneById(req.params.id);
        res.status(200).json({ status: "success", payload: products });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

// Ruta para crear un product, permite la subida de imágenes
router.post("/", uploader.single("file"), async (req, res) => {
    try {
        const products = await productManager.insertOne(req.body, req.file);
        res.status(201).json({ status: "success", payload: products });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

// Ruta para actualizar un product por su ID, permite la subida de imágenes
router.put("/:id", uploader.single("file"), async (req, res) => {
    try {
        const products = await productManager.updateOneById(req.params.id, req.body, req.file);
        res.status(200).json({ status: "success", payload: products });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

// Ruta para eliminar un product por su ID
router.delete("/:id", async (req, res) => {
    try {
        await productManager.deleteOneById(req.params.id);
        res.status(200).json({ status: "success" });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

export default router;