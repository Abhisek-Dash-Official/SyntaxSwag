import mongoose from "mongoose";

const OutfitSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc_: { type: String },
    colors: [{ type: String }],
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String },
    type: { type: String },
    img: { type: String },
    rate: { type: Number },
    reviews: { type: Number },
  },
  { timestamps: true, strict: false }
);

const outfit = mongoose.models.outfit || mongoose.model("outfit", OutfitSchema);

const DeskwareSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc_: { type: String },
    colors: [{ type: String }],
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String },
    type: { type: String },
    img: { type: String },
    rate: { type: Number },
    reviews: { type: Number },
  },
  { timestamps: true, strict: false }
);

const deskware =
  mongoose.models.deskware || mongoose.model("deskware", DeskwareSchema);

const stickerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc_: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String },
    type: { type: String },
    img: { type: String },
    rate: { type: Number },
    reviews: { type: Number },
  },
  { timestamps: true, strict: false }
);

const sticker =
  mongoose.models.sticker || mongoose.model("sticker", stickerSchema);

export { outfit, deskware, sticker };
