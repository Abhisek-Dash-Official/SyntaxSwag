import mongoose from "mongoose";

const userPurchaseSchema = new mongoose.Schema(
  {
    user: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      password: { type: String, required: true },
      confirmPassword: { type: String, required: true },
    },
    product_details: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
        id: { type: Number, required: true },
        title: { type: String, required: true },
        desc_: { type: String },
        colors: { type: [String] },
        price: { type: Number, required: true },
        stock: { type: Number },
        category: { type: String },
        type: { type: String },
        img: { type: String },
        rate: { type: Number },
        reviews: { type: Number },
        quantity: { type: Number, default: 1 },
        cartId: { type: String },
      },
    ],
    totalItems: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.UserPurchase ||
  mongoose.model("UserPurchase", userPurchaseSchema);
