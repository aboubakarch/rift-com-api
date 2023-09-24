import { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

// Schema is the definitaion of a model
// It means what a model can contain and what are their types

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: Boolean,
});

userSchema.plugin(paginate);

const User = model('user', userSchema);

export default User;
