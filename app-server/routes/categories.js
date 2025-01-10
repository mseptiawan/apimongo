const express = require("express");
const router = express.Router();
const CategoryController = require("../controller/categories");

router.get("/", CategoryController.getCategories);

router.post("/", CategoryController.createCategory);

router.get("/:id", CategoryController.getCategoryById);

router.put("/:id", CategoryController.updateCategory);

router.delete("/:id", CategoryController.deleteCategory);

module.exports = router;
