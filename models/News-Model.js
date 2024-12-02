const { Schema, model } = require("mongoose");

const NewsSchema = new Schema({
    title: { 
        type: String, 
        required: true
     },
    photoURL: { 
        type: String, 
        required: true 
    },
    publishedDateTime: { 
        type: Date, 
        required: true,
    },
});

const ProductModel = model('product', ProductsSchema);

module.exports = ProductsSchema;
