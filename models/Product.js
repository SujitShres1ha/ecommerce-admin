import mongoose, { Schema, model, models } from "mongoose";

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
  },
  images: [{
    type: String
  }],
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category'
  },
  properties: {
    type: Object
  }
},{timestamps: true})

export const productModel = models.Product || model('Product',productSchema)

