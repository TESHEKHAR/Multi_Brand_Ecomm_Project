import Product from "../models/Product.js";
import fs from "fs";
import path from "path";
import slugify from "slugify";
import mongoose from "mongoose";

// ✅ Create Product
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
      listPrice,
      discountPrice,
      weight,
      weightUnit,
      capacity,
      width,
      height,
      dimension,
      stock,
      sku,
      tags,
      isFeatured,
      ratings,
      reviews,
      status,
    } = req.body;

    const productImage = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    // ✅ Generate slug if missing
    const generatedSlug = slug?.trim() || slugify(name, { lower: true });

    // ✅ Generate SKU if not provided
    const generatedSku = sku?.trim() || `SKU-${Date.now()}`;

    // ✅ Validate ObjectId fields
    if (brand && !mongoose.Types.ObjectId.isValid(brand)) {
      return res.status(400).json({ message: "Invalid brand ID" });
    }

    const product = new Product({
      name,
      slug: generatedSlug,
      brand,
      description,
      brandImage,
      category,
      subCategory,
      productImage,
      listPrice: parseFloat(listPrice),
      discountPrice: parseFloat(discountPrice || 0),
      weight: parseFloat(weight),
      weightUnit: weightUnit || "kg",
      capacity: capacity || null,
      width: parseFloat(width),
      height: parseFloat(height),
      dimension: dimension ? parseFloat(dimension) : null,
      stock: parseInt(stock || 0),
      sku: generatedSku,
      tags: Array.isArray(tags) ? tags : tags ? [tags] : [],
      isFeatured: isFeatured === "true" || isFeatured === true,
      ratings: parseFloat(ratings || 0),
      reviews: parseInt(reviews || 0),
      status,
    });

    await product.save();

    res.status(201).json({
      message: "Product created successfully",
      product: product.toObject(),
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating product",
      error: error.message,
    });
  }
};

// ✅ Get All Products
export const getProducts = async (req, res) => {
  try {
    // const products = await Product.find()
    const products = await Product.find().sort({ createdAt: -1 })
      .populate("category", "name")
      .populate("subCategory", "name");

    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

// ✅ Get Product by Slug
export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug })
      .populate("brand")
      .populate("category");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    res.status(500).json({
      message: "Error fetching product",
      error: error.message,
    });
  }
};

// ✅ Get Product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
};

// ✅ Update Product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const {
      name,
      slug,
      brand,
      description,
      brandImage,
      category,
      subCategory,
      listPrice,
      discountPrice,
      weight,
      weightUnit,
      capacity,
      width,
      height,
      dimension,
      stock,
      sku,
      tags,
      isFeatured,
      ratings,
      reviews,
      status,
    } = req.body;

    const updatedData = {
      name,
      slug: slug?.trim() || slugify(name || product.name, { lower: true }),
      brand: brand && mongoose.Types.ObjectId.isValid(brand) ? brand : product.brand,
      description,
      brandImage,
      category:
        category && mongoose.Types.ObjectId.isValid(category)
          ? category
          : product.category,
      subCategory:
        subCategory && mongoose.Types.ObjectId.isValid(subCategory)
          ? subCategory
          : product.subCategory,
      listPrice: listPrice ? parseFloat(listPrice) : product.listPrice,
      discountPrice: discountPrice
        ? parseFloat(discountPrice)
        : product.discountPrice,
      weight: weight ? parseFloat(weight) : product.weight,
      weightUnit: weightUnit || product.weightUnit,
      capacity: capacity || product.capacity || null,
      width: width ? parseFloat(width) : product.width,
      height: height ? parseFloat(height) : product.height,
      dimension: dimension ? parseFloat(dimension) : product.dimension || null,
      stock: stock ? parseInt(stock) : product.stock,
      sku: sku?.trim() || product.sku || `SKU-${Date.now()}`,
      tags: Array.isArray(tags)
        ? tags
        : tags
        ? [tags]
        : product.tags,
      isFeatured: isFeatured === "true" || isFeatured === true,
      ratings: ratings ? parseFloat(ratings) : product.ratings,
      reviews: reviews ? parseInt(reviews) : product.reviews,
      status,
    };

    if (req.file) {
      if (product.productImage) {
        const oldImagePath = product.productImage.replace(
          `${req.protocol}://${req.get("host")}/uploads/`,
          ""
        );
        const fullOldImagePath = path.join(process.cwd(), "uploads", oldImagePath);

        if (fs.existsSync(fullOldImagePath)) {
          try {
            fs.unlinkSync(fullOldImagePath);
            console.log("Old image deleted successfully");
          } catch (unlinkError) {
            console.error(`Failed to delete old image: ${unlinkError.message}`);
          }
        }
      }

      updatedData.productImage = `${req.protocol}://${req.get(
        "host"
      )}/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating product",
      error: error.message,
    });
  }
};

// ✅ Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.productImage) {
      const imagePath = product.productImage.replace(
        `${req.protocol}://${req.get("host")}/uploads/`,
        ""
      );
      const fullImagePath = path.join(process.cwd(), "uploads", imagePath);

      if (fs.existsSync(fullImagePath)) {
        try {
          fs.unlinkSync(fullImagePath);
          console.log("Product Image deleted successfully");
        } catch (unlinkError) {
          console.error(`Failed to delete image: ${unlinkError.message}`);
        }
      }
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};
