import { Schema, model } from 'mongoose';

// Schema is the definitaion of a model
// It means what a model can contain and what are their types

const categorySchema = new Schema({
  name: { type: String, required: true },
});

const Category = model('category', categorySchema);

export default Category;
