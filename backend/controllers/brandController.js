import Brand from '../models/Brand.js';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// ✅ Create Brand
export const createBrand = async (req, res) => {
  try {
    const { name } = req.body;

    const existing = await Brand.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({ message: 'Brand already exists' });
    }

    const brandData = { name: name.trim() };

    if (req.file) {
      brandData.brandImage = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const brand = new Brand(brandData);
    await brand.save();

    res.status(201).json({
      message: 'Brand created successfully',
      brand,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error creating brand', error: error.message });
  }
};

// ✅ Get All Brands
export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find().sort({ createdAt: -1 });
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching brands', error: error.message });
  }
};

// ✅ Get Brand By ID
export const getBrandById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid brand ID' });
    }

    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching brand', error: error.message });
  }
};

// ✅ Update Brand
export const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid brand ID' });
    }

    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    const updatedData = {
      name: name?.trim() || brand.name,
    };

    if (req.file) {
      // Delete old image
      if (brand.brandImage) {
        const oldImagePath = brand.brandImage.replace(`${req.protocol}://${req.get('host')}/uploads/`, '');
        const fullPath = path.join(process.cwd(), 'uploads', oldImagePath);

        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      }

      updatedData.brandImage = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const updatedBrand = await Brand.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({ message: 'Brand updated successfully', brand: updatedBrand });
  } catch (error) {
    res.status(400).json({ message: 'Error updating brand', error: error.message });
  }
};

// ✅ Delete Brand
export const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid brand ID' });
    }

    const brand = await Brand.findByIdAndDelete(id);

    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    // Optionally delete image file
    if (brand.brandImage) {
      const oldImagePath = brand.brandImage.replace(`${req.protocol}://${req.get('host')}/uploads/`, '');
      const fullPath = path.join(process.cwd(), 'uploads', oldImagePath);

      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    res.status(200).json({ message: 'Brand deleted successfully', brand });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting brand', error: error.message });
  }
};
