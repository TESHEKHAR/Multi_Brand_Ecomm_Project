import Product from '../models/Product.js';
import fs from 'fs'; 
import path from 'path';
import slugify from 'slugify';
import mongoose from 'mongoose';

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      slug,
      brand,
      description,
      brandImage,
      category,
      subCategory,
      price,
      discount,
      stock,
      sku,
      tags,
      isFeatured,
      ratings,
      reviews,
      status
    } = req.body;

    const productImage = req.file
      ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
      : null;
      
    // ✅ Generate slug if missing
    const generatedSlug = slug?.trim() || slugify(name, { lower: true });

    // ✅ Generate SKU if not provided
    const generatedSku = sku?.trim() || `SKU-${Date.now()}`;

    // ✅ Optional: Validate ObjectId fields (if needed)
    if (brand && !mongoose.Types.ObjectId.isValid(brand)) {
      return res.status(400).json({ message: 'Invalid brand ID' });
    }
    const product = new Product({
      name,
      slug: slug?.trim() || slugify(name, { lower: true }),
      brand,
      description,
      brandImage,
      category,
      subCategory,
      productImage,
      price: parseFloat(price),
      discount: parseFloat(discount || 0),
      stock: parseInt(stock || 0),
      sku: generatedSku,
      tags: Array.isArray(tags) ? tags : tags ? [tags] : [],
      isFeatured: isFeatured === 'true' || isFeatured === true,
      ratings: parseFloat(ratings || 0),
      reviews: parseInt(reviews || 0),
      status
    });
    

    await product.save();

    res.status(201).json({
      message: 'Product created successfully',
      product: product.toObject()
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error creating product',
      error: error.message
    });
  }
};

// export const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find().populate('category');
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching products', error: error.message });
//   }
// };

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category', 'name')
      .populate('subCategory', 'name');

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};



export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const {
      name,
      slug,
      brand,
      description,
      brandImage,
      category,
      subCategory,
      price,
      discount,
      stock,
      sku,
      tags,
      isFeatured,
      ratings,
      reviews,
      status
    } = req.body;

    const updatedData = {
      name,
      slug: slug?.trim() || slugify(name || product.name, { lower: true }),
      brand: brand && mongoose.Types.ObjectId.isValid(brand) ? brand : product.brand,
      description,
      brandImage,
      category: category && mongoose.Types.ObjectId.isValid(category) ? category : product.category,
      subCategory: subCategory && mongoose.Types.ObjectId.isValid(subCategory) ? subCategory : product.subCategory,
      price: price ? parseFloat(price) : product.price,
      discount: discount ? parseFloat(discount) : product.discount,
      stock: stock ? parseInt(stock) : product.stock,
      sku: sku?.trim() || product.sku || `SKU-${Date.now()}`,
      tags: Array.isArray(tags) ? tags : tags ? [tags] : product.tags,
      isFeatured: isFeatured === 'true' || isFeatured === true,
      ratings: ratings ? parseFloat(ratings) : product.ratings,
      reviews: reviews ? parseInt(reviews) : product.reviews,
      status
    };
    if (req.file) {
      if (product.productImage) {
        const oldImagePath = product.productImage.replace(`${req.protocol}://${req.get('host')}/uploads/`, '');
        const fullOldImagePath = path.join(process.cwd(), 'uploads', oldImagePath);

        if (fs.existsSync(fullOldImagePath)) {
          try {
            fs.unlinkSync(fullOldImagePath);
            console.log('Old image deleted successfully');
          } catch (unlinkError) {
            console.error(`Failed to delete old image: ${unlinkError.message}`);
          }
        }
      }

      updatedData.productImage = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });

    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating product',
      error: error.message
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.productImage) {
      const imagePath = product.productImage.replace(`${req.protocol}://${req.get('host')}/uploads/`, '');
      const fullImagePath = path.join(process.cwd(), 'uploads', imagePath);

      if (fs.existsSync(fullImagePath)) {
        try {
          fs.unlinkSync(fullImagePath);
          console.log('Product Image deleted successfully');
        } catch (unlinkError) {
          console.error(`Failed to delete image: ${unlinkError.message}`);
        }
      }
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};
