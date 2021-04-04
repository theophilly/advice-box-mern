import mongoose from 'mongoose';
import CategoryModel from './categoryModel.js';

const adviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: 'general',
  },
  content: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});

// adviceSchema.virtual("categories").get(function () {
//   return this.schema.path("category").enumValues;
// });

adviceSchema.pre('save', async function (next) {
  await CategoryModel.find({}, (err, docs) => {
    docs[0].categories.indexOf(this.category) >= 0
      ? next()
      : next(new Error('validation failed'));
  });
});

export default mongoose.model('Advice', adviceSchema);
