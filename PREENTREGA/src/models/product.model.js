import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new Schema({
    title: {
        index: { name: "idx_title" },
        type: String,
        required: [ true, "El nombre es obligatorio" ],
        uppercase: true,
        trim: true,
        minLength: [ 3, "El nombre debe tener al menos 3 caracteres" ],
        maxLength: [ 25, "El nombre debe tener como máximo 25 caracteres" ],
    },
    description: {
        type: String,
        //required: [ true, "La descripcion es obligatorio" ],
        uppercase: true,
        trim: true,
        minLength: [ 3, "La descripcion debe tener al menos 3 caracteres" ],
        maxLength: [ 250, "La descripcion debe tener como máximo 250 caracteres" ],
    },
    code: {
        type: String,
        required: [ true, "El codigo es obligatorio" ],
        uppercase: true,
        trim: true,
        minLength: [ 3, "El codigo  debe tener al menos 3 caracteres" ],
        maxLength: [ 125, "El codigo debe tener como máximo 125 caracteres" ],
    },
    price: {
        type: Number,
        required: [ true, "El precio es obligatorio" ],
        min: [ 0, "El precio debe ser un valor positivo" ],
    },  
    status: {
        type: Boolean,
        required: [ true, "El estado es obligatorio" ],
    },
    stock: {
        type: Number,
        required: [ true, "El stock es obligatorio" ],
        min: [ 0, "El stock debe ser un valor positivo" ],
    },
    category: {
        type: String,
        //required: [ true, "La categoria es obligatorio" ],
        uppercase: true,
        trim: true,
        minLength: [ 3, "La categoria  debe tener al menos 3 caracteres" ],
        maxLength: [ 50, "La categoria debe tener como máximo 50 caracteres" ],
    },
    thumbnail: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
    versionKey: false, // Elimina el campo __v de versión
});

// Agrega mongoose-paginate-v2 para habilitar las funcionalidades de paginación.
productSchema.plugin(paginate);

const ProductModel = model("products", productSchema);

export default ProductModel;