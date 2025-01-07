const Category = require("../model/categories");

// Create category
const createCategory = (req, res) => {
  const category = new Category({
    name: req.body.name,
  });

  category
    .save()
    .then((createdCategory) => {
      res.status(201).json({
        message: "Category created successfully",
        categoryId: createdCategory._id,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error creating category",
        error: err,
      });
    });
};

// Get all categories
const getCategories = (req, res) => {
  Category.find()
    .then((categories) => {
      res.status(200).json({
        message: "Categories fetched successfully",
        categories: categories,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error fetching categories",
        error: err,
      });
    });
};

// Get category by ID (optional, if needed)
const getCategoryById = (req, res) => {
  const categoryId = req.params.id;

  Category.findById(categoryId)
    .then((category) => {
      if (!category) {
        return res.status(404).json({
          message: "Category not found",
        });
      }
      res.status(200).json({
        category: category,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error fetching category",
        error: err,
      });
    });
};

// Update category by ID
const updateCategory = (req, res) => {
  const categoryId = req.params.id;
  const updatedData = {
    name: req.body.name,
  };

  Category.findByIdAndUpdate(categoryId, updatedData, { new: true })
    .then((updatedCategory) => {
      if (!updatedCategory) {
        return res.status(404).json({
          message: "Category not found",
        });
      }
      res.status(200).json({
        message: "Category updated successfully",
        category: updatedCategory,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error updating category",
        error: err,
      });
    });
};

// Delete category by ID
const deleteCategory = (req, res) => {
  const categoryId = req.params.id;

  Category.findByIdAndDelete(categoryId)
    .then((deletedCategory) => {
      if (!deletedCategory) {
        return res.status(404).json({
          message: "Category not found",
        });
      }
      res.status(200).json({
        message: "Category deleted successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error deleting category",
        error: err,
      });
    });
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
