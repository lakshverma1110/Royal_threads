import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      id: { type: Number, required: true },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      img: { type: String },
      quantity: { type: Number, default: 1 },
    },
  ],
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema);
