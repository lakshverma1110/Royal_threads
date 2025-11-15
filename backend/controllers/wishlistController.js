// controllers/wishlistController.js
import Wishlist from "../models/Wishlist.js";

export const addToWishlist = async (req, res) => {
  try {
    const { id, title, price, img, category } = req.body;

    // Validate required fields
    if (!id || !title || !price) {
      return res.status(400).json({ message: "Missing required fields: id, title, price" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });
    
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user._id, items: [] });
    }

    // Check if item already exists
    const existingItem = wishlist.items.find((item) => item.id === id);
    
    if (existingItem) {
      return res.status(400).json({ message: "Item already in wishlist" });
    }

    // Add new item to wishlist
    wishlist.items.push({ id, title, price, img, category });
    await wishlist.save();

    res.status(201).json({ 
      message: "Item added to wishlist",
      wishlist 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    res.json(wishlist || { items: [], user: req.user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const wishlist = await Wishlist.findOne({ user: req.user._id });
    
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.items = wishlist.items.filter((item) => item.id !== id);
    await wishlist.save();

    res.json({ 
      message: "Item removed from wishlist",
      wishlist 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const clearWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.items = [];
    await wishlist.save();

    res.json({ message: "Wishlist cleared", wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
