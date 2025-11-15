import express from "express";
import { 
  addToCart, 
  getCart, 
  removeFromCart, 
  updateCartQuantity, 
  clearCart 
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/cart/add
 * @desc    Add item to cart
 * @access  Private
 */
router.post("/add", protect, addToCart);

/**
 * @route   GET /api/cart
 * @desc    Get user's cart
 * @access  Private
 */
router.get("/", protect, getCart);

/**
 * @route   DELETE /api/cart/remove
 * @desc    Remove item from cart
 * @access  Private
 */
router.delete("/remove", protect, removeFromCart);

/**
 * @route   PUT /api/cart/update
 * @desc    Update item quantity in cart
 * @access  Private
 */
router.put("/update", protect, updateCartQuantity);

/**
 * @route   DELETE /api/cart/clear
 * @desc    Clear entire cart
 * @access  Private
 */
router.delete("/clear", protect, clearCart);

export default router;
