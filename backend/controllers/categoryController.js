// import Category from "../models/Category.js";
// import mongoose from 'mongoose';

// export const createCategory = async (req, res) => {
//   try {
//     console.log('Request body:', req.body);
//     const { name } = req.body;

//     // Validate input (optional but recommended)
//     if (!name) {
//       return res.status(400).json({ message: "Category name is required" });
//     }

//     const category = new Category({ name });

//     await category.save();

//     res.status(201).json({
//       message: 'Category created successfully',
//       category: category.toObject(),
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: 'Error creating category',
//       error: error.message,
//     });
//   }
// };

// export const getCategories = async (req, res) => {
//     try {
//       const categories = await Category.find();
//       res.status(200).json(categories);
//     } catch (error) {
//       res.status(500).json({
//         message: 'Error fetching categories',
//         error: error.message,
//       });
//     }
//   };

// export const getCategoryById = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const category = await Category.findById(id);
  
//       if (!category) {
//         return res.status(404).json({ message: 'Category not found' });
//       }
  
//       res.status(200).json(category);
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching category', error: error.message });
//     }
//   };
//   export const updateCategory = async (req, res) => {
//     try {
//       const { id } = req.params;
  
//       // Validate ObjectId
//       if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({ message: 'Invalid category ID' });
//       }
  
//       const { name } = req.body;
  
//       if (!name || name.trim() === '') {
//         return res.status(400).json({ message: 'Category name is required' });
//       }
  
//       const updatedCategory = await Category.findByIdAndUpdate(
//         id,
//         { name: name.trim() },
//         { new: true }
//       );
  
//       if (!updatedCategory) {
//         return res.status(404).json({ message: 'Category not found' });
//       }
  
//       res.status(200).json({
//         message: 'Category updated successfully',
//         category: updatedCategory
//       });
//     } catch (error) {
//       res.status(500).json({
//         message: 'Error updating category',
//         error: error.message
//       });
//     }
//   };

//   export const deleteCategory = async (req, res) => {
//     try {
//       const { id } = req.params;
  
//       // Validate ObjectId
//       if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({ message: 'Invalid category ID' });
//       }
  
//       const category = await Category.findByIdAndDelete(id);
  
//       if (!category) {
//         return res.status(404).json({ message: 'Category not found' });
//       }
  
//       res.status(200).json({
//         message: 'Category deleted successfully',
//         category
//       });
//     } catch (error) {
//       res.status(500).json({
//         message: 'Error deleting category',
//         error: error.message
//       });
//     }
//   };


import Category from "../models/Category.js";
import mongoose from 'mongoose';

export const createCategory = async (req, res) => {
  try {
    const { name, brand } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const category = new Category({ name, brand });

    await category.save();

    const populatedCategory = await category.populate('brand');

    res.status(201).json({
      message: 'Category created successfully',
      category: populatedCategory.toObject(),
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error creating category',
      error: error.message,
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("brand");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching categories',
      error: error.message,
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id).populate("brand");

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    const { name, brand } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name: name.trim(), brand },
      { new: true }
    ).populate("brand");

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({
      message: 'Category updated successfully',
      category: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating category',
      error: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({
      message: 'Category deleted successfully',
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting category',
      error: error.message,
    });
  }
};

  
