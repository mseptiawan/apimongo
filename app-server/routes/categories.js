const express = require("express");
const router = express.Router();
const CategoryController = require("../controller/categories");

// Route untuk mendapatkan semua kategori
router.get("/", CategoryController.getCategories);

// Route untuk membuat kategori baru
router.post("/", CategoryController.createCategory);

// Route untuk mendapatkan kategori berdasarkan ID
router.get("/:id", CategoryController.getCategoryById);

// Route untuk memperbarui kategori berdasarkan ID
router.put("/:id", CategoryController.updateCategory);

// Route untuk menghapus kategori berdasarkan ID
router.delete("/:id", CategoryController.deleteCategory);

module.exports = router;
