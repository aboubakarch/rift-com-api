import { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

// Schema is the definitaion of a model
// It means what a model can contain and what are their types

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discount: Number,
  category: { type: Schema.Types.ObjectId, ref: 'category', required: true },
  description: String,
  quantity: { type: Number, required: true },
});

productSchema.plugin(paginate);

const Product = model('product', productSchema);

export default Product;
