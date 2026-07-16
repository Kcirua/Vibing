const express = require("express");

const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

const productController = require("../controllers/productController");

router.get("/", productController.getProducts);

router.get("/:id", productController.getProduct);

router.post("/", verifyToken, productController.createProduct);

router.put("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;