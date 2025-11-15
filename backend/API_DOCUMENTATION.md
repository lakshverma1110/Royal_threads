# RoyalThreads Backend API Documentation

## Authentication
All endpoints (except login/register) require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Cart API Endpoints

### 1. Add Item to Cart
**POST** `/api/cart/add`

**Headers:**
```json
{
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
}
```

**Request Body:**
```json
{
  "id": 1,
  "title": "Product Name",
  "price": 99.99,
  "img": "image_url",
  "quantity": 1
}
```

**Required Fields:** `id`, `title`, `price`
**Optional Fields:** `img`, `quantity` (default: 1)

**Success Response (201):**
```json
{
  "message": "Item added to cart",
  "cart": {
    "_id": "cart_id",
    "user": "user_id",
    "items": [
      {
        "id": 1,
        "title": "Product Name",
        "price": 99.99,
        "img": "image_url",
        "quantity": 1
      }
    ],
    "createdAt": "2025-11-12T...",
    "updatedAt": "2025-11-12T..."
  }
}
```

**Error Response (400/500):**
```json
{
  "message": "Error description",
  "error": "Error details"
}
```

---

### 2. Get User's Cart
**GET** `/api/cart`

**Headers:**
```json
{
  "Authorization": "Bearer <token>"
}
```

**Success Response (200):**
```json
{
  "_id": "cart_id",
  "user": {
    "_id": "user_id",
    "email": "user@example.com",
    "username": "username"
  },
  "items": [
    {
      "id": 1,
      "title": "Product Name",
      "price": 99.99,
      "img": "image_url",
      "quantity": 2
    }
  ],
  "createdAt": "2025-11-12T...",
  "updatedAt": "2025-11-12T..."
}
```

---

### 3. Update Item Quantity
**PUT** `/api/cart/update`

**Headers:**
```json
{
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
}
```

**Request Body:**
```json
{
  "id": 1,
  "quantity": 5
}
```

**Success Response (200):**
```json
{
  "message": "Cart updated",
  "cart": { ... }
}
```

---

### 4. Remove Item from Cart
**DELETE** `/api/cart/remove`

**Headers:**
```json
{
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
}
```

**Request Body:**
```json
{
  "id": 1
}
```

**Success Response (200):**
```json
{
  "message": "Item removed from cart",
  "cart": { ... }
}
```

---

### 5. Clear Entire Cart
**DELETE** `/api/cart/clear`

**Headers:**
```json
{
  "Authorization": "Bearer <token>"
}
```

**Success Response (200):**
```json
{
  "message": "Cart cleared",
  "cart": {
    "_id": "cart_id",
    "user": "user_id",
    "items": [],
    "createdAt": "2025-11-12T...",
    "updatedAt": "2025-11-12T..."
  }
}
```

---

## Wishlist API Endpoints

### 1. Add Item to Wishlist
**POST** `/api/wishlist/add`

**Headers:**
```json
{
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
}
```

**Request Body:**
```json
{
  "id": 1,
  "title": "Product Name",
  "price": 99.99,
  "img": "image_url",
  "category": "Women"
}
```

**Required Fields:** `id`, `title`, `price`
**Optional Fields:** `img`, `category`

**Success Response (201):**
```json
{
  "message": "Item added to wishlist",
  "wishlist": {
    "_id": "wishlist_id",
    "user": "user_id",
    "items": [
      {
        "id": 1,
        "title": "Product Name",
        "price": 99.99,
        "img": "image_url",
        "category": "Women"
      }
    ],
    "createdAt": "2025-11-12T...",
    "updatedAt": "2025-11-12T..."
  }
}
```

**Error Response (400):**
```json
{
  "message": "Item already in wishlist"
}
```

---

### 2. Get User's Wishlist
**GET** `/api/wishlist`

**Headers:**
```json
{
  "Authorization": "Bearer <token>"
}
```

**Success Response (200):**
```json
{
  "_id": "wishlist_id",
  "user": "user_id",
  "items": [
    {
      "id": 1,
      "title": "Product Name",
      "price": 99.99,
      "img": "image_url",
      "category": "Women"
    }
  ],
  "createdAt": "2025-11-12T...",
  "updatedAt": "2025-11-12T..."
}
```

---

### 3. Remove Item from Wishlist
**DELETE** `/api/wishlist/remove`

**Headers:**
```json
{
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
}
```

**Request Body:**
```json
{
  "id": 1
}
```

**Success Response (200):**
```json
{
  "message": "Item removed from wishlist",
  "wishlist": { ... }
}
```

---

### 4. Clear Entire Wishlist
**DELETE** `/api/wishlist/clear`

**Headers:**
```json
{
  "Authorization": "Bearer <token>"
}
```

**Success Response (200):**
```json
{
  "message": "Wishlist cleared",
  "wishlist": {
    "_id": "wishlist_id",
    "user": "user_id",
    "items": [],
    "createdAt": "2025-11-12T...",
    "updatedAt": "2025-11-12T..."
  }
}
```

---

## Database Schema

### Cart Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (Reference to User),
  items: [
    {
      id: Number,
      title: String,
      price: Number,
      img: String,
      quantity: Number
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

### Wishlist Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (Reference to User),
  items: [
    {
      id: Number,
      title: String,
      price: Number,
      img: String,
      category: String
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

---

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 400 | Missing required fields | Required field is missing from request |
| 400 | Item already in wishlist | Item already exists in user's wishlist |
| 400 | Quantity must be at least 1 | Invalid quantity value |
| 401 | User not authenticated | No valid JWT token provided |
| 404 | Cart/Wishlist not found | User's cart/wishlist doesn't exist |
| 404 | Item not found | Item doesn't exist in cart/wishlist |
| 500 | Server Error | Internal server error |

---

## Example Usage (cURL)

### Add to Cart
```bash
curl -X POST http://localhost:5000/api/cart/add \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "title": "Red Saree",
    "price": 2500,
    "img": "https://...",
    "quantity": 1
  }'
```

### Add to Wishlist
```bash
curl -X POST http://localhost:5000/api/wishlist/add \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "title": "Red Saree",
    "price": 2500,
    "img": "https://...",
    "category": "Women"
  }'
```

### Get Cart
```bash
curl -X GET http://localhost:5000/api/cart \
  -H "Authorization: Bearer <token>"
```

### Get Wishlist
```bash
curl -X GET http://localhost:5000/api/wishlist \
  -H "Authorization: Bearer <token>"
```

### Remove from Cart
```bash
curl -X DELETE http://localhost:5000/api/cart/remove \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"id": 1}'
```

### Clear Cart
```bash
curl -X DELETE http://localhost:5000/api/cart/clear \
  -H "Authorization: Bearer <token>"
```

---

## Notes

- All cart and wishlist operations require authentication (JWT token)
- Cart tracks quantity; wishlist does not
- Duplicate items in wishlist are not allowed
- Duplicate items in cart increment the quantity
- All timestamps are in UTC format
- Deleted wishlists/carts return empty items array instead of null
