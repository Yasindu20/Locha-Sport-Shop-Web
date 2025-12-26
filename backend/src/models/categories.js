import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "Name must be at Least 3 characters Long"],
    },
    productcount: {
      type: Number,
      required: true,
      min: [0, "product count cannot be negative"],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categoriesSchema);

export default Category;
