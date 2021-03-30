import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categories: {
    type: [String],
  },
});

export default mongoose.model("Category", categorySchema);
