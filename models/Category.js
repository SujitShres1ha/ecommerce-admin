import mongoose, { model, models, Schema } from "mongoose"
const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  parent: {
    type: mongoose.Types.ObjectId,
    ref: 'Category'
  },
  properties: [{
    name: {type: String, required: true},
    values: [{type: String}]
  }]
})

export const categoryModel = models.Category || model('Category',categorySchema)