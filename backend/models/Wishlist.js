import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      id: { type: Number, required: true },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      img: { type: String },
      category: { type: String }
    }
  ]
}, { timestamps: true });

export default mongoose.model("Wishlist", wishlistSchema);
