const { Schema, model, models } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true
  }
})

export const productModel = models.Product || model('Product',productSchema)

