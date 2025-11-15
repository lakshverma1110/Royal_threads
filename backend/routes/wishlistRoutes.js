import express from "express";
import { 
  addToWishlist, 
  getWishlist, 
  removeFromWishlist, 
  clearWishlist 
} from "../controllers/wishlistController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/wishlist/add
 * @desc    Add item to wishlist
 * @access  Private
 */
router.post("/add", protect, addToWishlist);

/**
 * @route   GET /api/wishlist
 * @desc    Get user's wishlist
 * @access  Private
 */
router.get("/", protect, getWishlist);

/**
 * @route   DELETE /api/wishlist/remove
 * @desc    Remove item from wishlist
 * @access  Private
 */
router.delete("/remove", protect, removeFromWishlist);

/**
 * @route   DELETE /api/wishlist/clear
 * @desc    Clear entire wishlist
 * @access  Private
 */
router.delete("/clear", protect, clearWishlist);

export default router;
