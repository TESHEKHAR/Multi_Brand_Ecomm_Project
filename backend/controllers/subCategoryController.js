import SubCategory from '../models/SubCategory.js';
import Category from '../models/Category.js';
import mongoose from 'mongoose';

// Create Subcategory
export const createSubCategory = async (req, res) => {
  try {
    const { name, category } = req.body;

    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    const subCategory = new SubCategory({ name, category });
    await subCategory.save();

    res.status(201).json({ message: 'Subcategory created', subCategory });
  } catch (error) {
    res.status(400).json({ message: 'Error creating subcategory', error: error.message });
  }
};

// Get All Subcategories
export const getSubCategories = async (req, res) => {
  try {
    const subcategories = await SubCategory.find().populate('category', 'name');
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subcategories', error: error.message });
  }
};

// Get Subcategory by ID
export const getSubCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const subcategory = await SubCategory.findById(id).populate('category', 'name');
    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subcategory', error: error.message });
  }
};

// Update Subcategory
export const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category } = req.body;

    const update = { name };
    if (mongoose.Types.ObjectId.isValid(category)) {
      update.category = category;
    }

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(id, update, { new: true });
    if (!updatedSubCategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json({ message: 'Subcategory updated', subCategory: updatedSubCategory });
  } catch (error) {
    res.status(400).json({ message: 'Error updating subcategory', error: error.message });
  }
};

// Delete Subcategory
export const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await SubCategory.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json({ message: 'Subcategory deleted', subCategory: deleted });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subcategory', error: error.message });
  }
};
