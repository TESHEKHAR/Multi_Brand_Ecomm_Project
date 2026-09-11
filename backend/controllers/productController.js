import Product from "../models/Product.js";
import fs from "fs";
import path from "path";
import slugify from "slugify";
import mongoose from "mongoose";

// ============================================
// Helper Functions for CSV Import
// ============================================

// Escape regex special characters
const escapeRegex = (value) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

// Generate unique SKU
const generateUniqueSKU = async (index = 0) => {
  let sku;

  do {
    sku = `SKU-${Date.now()}-${index}-${Math.floor(
      Math.random() * 10000
    )}`;
  } while (await Product.exists({ sku }));

  return sku;
};

// Generate unique slug
const generateUniqueSlug = async (
  name,
  existingProductId = null
) => {
  let baseSlug = slugify(name, {
    lower: true,
    strict: true,
    trim: true,
  });

  if (!baseSlug) {
    baseSlug = `product-${Date.now()}`;
  }

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const query = {
      slug,
    };

    // Existing product को exclude करें
    if (existingProductId) {
      query._id = {
        $ne: existingProductId,
      };
    }

    const exists = await Product.findOne(query);

    if (!exists) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

// ============================================
// CSV Line Parser
// ============================================

const parseCSVLine = (line) => {
  const result = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (insideQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current.trim());

  return result;
};

// ============================================
// Safe Number Helpers
// ============================================

const safeParseFloat = (value, defaultValue = 0) => {
  if (
    value === undefined ||
    value === null ||
    String(value).trim() === ""
  ) {
    return defaultValue;
  }

  const number = parseFloat(value);

  return Number.isNaN(number)
    ? defaultValue
    : number;
};

const safeParseInt = (value, defaultValue = 0) => {
  if (
    value === undefined ||
    value === null ||
    String(value).trim() === ""
  ) {
    return defaultValue;
  }

  const number = parseInt(value, 10);

  return Number.isNaN(number)
    ? defaultValue
    : number;
};

// ============================================
// Boolean Helper
// ============================================

const parseBoolean = (value) => {
  if (typeof value === "boolean") {
    return value;
  }

  const normalized = String(value || "")
    .trim()
    .toLowerCase();

  return (
    normalized === "true" ||
    normalized === "1" ||
    normalized === "yes"
  );
};

// ============================================
// Create Product
// ============================================

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
      // width,
      // height,
      // dimension,
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

    // Generate slug if missing
    const generatedSlug =
      slug?.trim() ||
      slugify(name, {
        lower: true,
        strict: true,
      });

    // Generate SKU if not provided
    const generatedSku =
      sku?.trim() ||
      `SKU-${Date.now()}`;

    // Validate ObjectId fields
    if (
      brand &&
      !mongoose.Types.ObjectId.isValid(brand)
    ) {
      return res.status(400).json({
        message: "Invalid brand ID",
      });
    }

    if (
      category &&
      !mongoose.Types.ObjectId.isValid(category)
    ) {
      return res.status(400).json({
        message: "Invalid category ID",
      });
    }

    if (
      subCategory &&
      !mongoose.Types.ObjectId.isValid(subCategory)
    ) {
      return res.status(400).json({
        message: "Invalid subCategory ID",
      });
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

      listPrice: safeParseFloat(listPrice),

      discountPrice: safeParseFloat(
        discountPrice
      ),

      weight: safeParseFloat(weight),

      weightUnit:
        weightUnit || "kg",

      capacity:
        capacity || null,

      // width: parseFloat(width),
      // height: parseFloat(height),
      // dimension: dimension ? parseFloat(dimension) : null,

      stock: safeParseInt(stock),

      sku: generatedSku,

      tags: Array.isArray(tags)
        ? tags
        : tags
        ? [tags]
        : [],

      isFeatured:
        isFeatured === "true" ||
        isFeatured === true,

      ratings:
        safeParseFloat(ratings),

      reviews:
        safeParseInt(reviews),

      status,
    });

    await product.save();

    res.status(201).json({
      message:
        "Product created successfully",

      product:
        product.toObject(),
    });
  } catch (error) {
    res.status(400).json({
      message:
        "Error creating product",

      error:
        error.message,
    });
  }
};

// ============================================
// Get All Products
// ============================================

export const getProducts = async (req, res) => {
  try {
    // const products = await Product.find()

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .populate("category", "name")
      .populate("subCategory", "name");

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message:
        "Error fetching products",

      error:
        error.message,
    });
  }
};

// ============================================
// Get Product by Slug
// ============================================

export const getProductBySlug = async (
  req,
  res
) => {
  try {
    const { slug } = req.params;

    const product =
      await Product.findOne({ slug })
        .populate("brand")
        .populate("category");

    if (!product) {
      return res.status(404).json({
        message:
          "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(
      "Error fetching product by slug:",
      error
    );

    res.status(500).json({
      message:
        "Error fetching product",

      error:
        error.message,
    });
  }
};

// ============================================
// Get Product by ID
// ============================================

export const getProductById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const product =
      await Product.findById(id)
        .populate("category");

    if (!product) {
      return res.status(404).json({
        message:
          "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message:
        "Error fetching product",

      error:
        error.message,
    });
  }
};

// ============================================
// Update Product
// ============================================

export const updateProduct = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return res.status(400).json({
        message:
          "Invalid product ID",
      });
    }

    const product =
      await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message:
          "Product not found",
      });
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
      // width,
      // height,
      // dimension,
      stock,
      sku,
      tags,
      isFeatured,
      ratings,
      reviews,
      status,
    } = req.body;

    // Validate brand
    if (
      brand &&
      !mongoose.Types.ObjectId.isValid(brand)
    ) {
      return res.status(400).json({
        message:
          "Invalid brand ID",
      });
    }

    // Validate category
    if (
      category &&
      !mongoose.Types.ObjectId.isValid(
        category
      )
    ) {
      return res.status(400).json({
        message:
          "Invalid category ID",
      });
    }

    // Validate subCategory
    if (
      subCategory &&
      !mongoose.Types.ObjectId.isValid(
        subCategory
      )
    ) {
      return res.status(400).json({
        message:
          "Invalid subCategory ID",
      });
    }

    const updatedData = {
      name,

      slug:
        slug?.trim() ||
        slugify(
          name || product.name,
          {
            lower: true,
            strict: true,
          }
        ),

      brand:
        brand &&
        mongoose.Types.ObjectId.isValid(
          brand
        )
          ? brand
          : product.brand,

      description,

      brandImage,

      category:
        category &&
        mongoose.Types.ObjectId.isValid(
          category
        )
          ? category
          : product.category,

      subCategory:
        subCategory &&
        mongoose.Types.ObjectId.isValid(
          subCategory
        )
          ? subCategory
          : product.subCategory,

      listPrice:
        listPrice !== undefined &&
        listPrice !== ""
          ? parseFloat(listPrice)
          : product.listPrice,

      discountPrice:
        discountPrice !== undefined &&
        discountPrice !== ""
          ? parseFloat(discountPrice)
          : product.discountPrice,

      weight:
        weight !== undefined &&
        weight !== ""
          ? parseFloat(weight)
          : product.weight,

      weightUnit:
        weightUnit ||
        product.weightUnit,

      capacity:
        capacity ||
        product.capacity ||
        null,

      // width: width ? parseFloat(width) : product.width,
      // height: height ? parseFloat(height) : product.height,
      // dimension: dimension ? parseFloat(dimension) : product.dimension || null,

      stock:
        stock !== undefined &&
        stock !== ""
          ? parseInt(stock, 10)
          : product.stock,

      sku:
        sku?.trim() ||
        product.sku ||
        `SKU-${Date.now()}`,

      tags:
        Array.isArray(tags)
          ? tags
          : tags
          ? [tags]
          : product.tags,

      isFeatured:
        isFeatured === "true" ||
        isFeatured === true,

      ratings:
        ratings !== undefined &&
        ratings !== ""
          ? parseFloat(ratings)
          : product.ratings,

      reviews:
        reviews !== undefined &&
        reviews !== ""
          ? parseInt(reviews, 10)
          : product.reviews,

      status:
        status ||
        product.status,
    };

    // ========================================
    // UPDATE PRODUCT IMAGE
    // ========================================

    if (req.file) {
      if (product.productImage) {
        const oldImagePath =
          product.productImage.replace(
            `${req.protocol}://${req.get(
              "host"
            )}/uploads/`,
            ""
          );

        const fullOldImagePath =
          path.join(
            process.cwd(),
            "uploads",
            oldImagePath
          );

        if (
          fs.existsSync(
            fullOldImagePath
          )
        ) {
          try {
            fs.unlinkSync(
              fullOldImagePath
            );

            console.log(
              "Old image deleted successfully"
            );
          } catch (
            unlinkError
          ) {
            console.error(
              `Failed to delete old image: ${unlinkError.message}`
            );
          }
        }
      }

      updatedData.productImage =
        `${req.protocol}://${req.get(
          "host"
        )}/uploads/${req.file.filename}`;
    }

    const updatedProduct =
      await Product.findByIdAndUpdate(
        id,
        updatedData,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      message:
        "Product updated successfully",

      product:
        updatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      message:
        "Error updating product",

      error:
        error.message,
    });
  }
};

// ============================================
// Delete Product
// ============================================

export const deleteProduct = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const product =
      await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        message:
          "Product not found",
      });
    }

    if (product.productImage) {
      const imagePath =
        product.productImage.replace(
          `${req.protocol}://${req.get(
            "host"
          )}/uploads/`,
          ""
        );

      const fullImagePath =
        path.join(
          process.cwd(),
          "uploads",
          imagePath
        );

      if (
        fs.existsSync(fullImagePath)
      ) {
        try {
          fs.unlinkSync(
            fullImagePath
          );

          console.log(
            "Product Image deleted successfully"
          );
        } catch (
          unlinkError
        ) {
          console.error(
            `Failed to delete image: ${unlinkError.message}`
          );
        }
      }
    }

    res.status(200).json({
      message:
        "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Error deleting product",

      error:
        error.message,
    });
  }
};

// ============================================
// ✅ Import Products from CSV
// ============================================

export const importProductsFromCSV = async (
  req,
  res
) => {
  let csvFilePath = null;

  try {
    // ========================================
    // CHECK FILE
    // ========================================

    if (!req.file) {
      return res.status(400).json({
        message:
          "Please upload a CSV file",
      });
    }

    csvFilePath = req.file.path;

    // ========================================
    // READ CSV
    // ========================================

    const csvData =
      fs.readFileSync(
        csvFilePath,
        "utf8"
      );

    const lines = csvData
      .split(/\r?\n/)
      .filter(
        (line) =>
          line.trim() !== ""
      );

    if (lines.length < 2) {
      return res.status(400).json({
        message:
          "CSV file is empty or has no product data",
      });
    }

    // ========================================
    // HEADERS
    // ========================================

    const headers =
      parseCSVLine(lines[0]).map(
        (header) =>
          header
            .replace(/^\uFEFF/, "")
            .trim()
      );

    // ========================================
    // ROWS
    // ========================================

    const rows = lines
      .slice(1)
      .map((line) => {
        const values =
          parseCSVLine(line);

        const row = {};

        headers.forEach(
          (header, index) => {
            row[header] =
              values[index] !==
              undefined
                ? values[index].trim()
                : "";
          }
        );

        return row;
      });

    let created = 0;
    let updated = 0;
    let skipped = 0;

    const errors = [];

    // ========================================
    // PROCESS EVERY ROW
    // ========================================

    for (
      let i = 0;
      i < rows.length;
      i++
    ) {
      const row = rows[i];

      try {
        // ====================================
        // PRODUCT NAME
        // ====================================

        const productName =
          row.name?.trim();

        if (!productName) {
          skipped++;

          errors.push({
            row: i + 2,
            message:
              "Product name is required",
          });

          continue;
        }

        // ====================================
        // BRAND
        // ====================================

        let brandId = null;

        let brandImage =
          row.brandImage?.trim() ||
          "";

        if (row.brand?.trim()) {
          const Brand =
            mongoose.model("Brand");

          const brandName =
            row.brand.trim();

          const brand =
            await Brand.findOne({
              name: {
                $regex: `^${escapeRegex(
                  brandName
                )}$`,
                $options: "i",
              },
            });

          if (!brand) {
            skipped++;

            errors.push({
              row: i + 2,
              message: `Brand not found: ${brandName}`,
            });

            continue;
          }

          brandId =
            brand._id;

          // Brand image fallback
          if (
            !brandImage &&
            brand.image
          ) {
            brandImage =
              brand.image;
          }
        }

        // ====================================
        // CATEGORY
        // ====================================

        let categoryId = null;

        if (
          row.category?.trim()
        ) {
          const Category =
            mongoose.model(
              "Category"
            );

          const categoryName =
            row.category.trim();

          const category =
            await Category.findOne({
              name: {
                $regex: `^${escapeRegex(
                  categoryName
                )}$`,
                $options: "i",
              },
            });

          if (!category) {
            skipped++;

            errors.push({
              row: i + 2,
              message: `Category not found: ${categoryName}`,
            });

            continue;
          }

          categoryId =
            category._id;
        }

        // ====================================
        // SUB CATEGORY
        // ====================================

        let subCategoryId =
          null;

        if (
          row.subCategory?.trim()
        ) {
          try {
            const SubCategory =
              mongoose.model(
                "SubCategory"
              );

            const subCategoryName =
              row.subCategory.trim();

            const subCategory =
              await SubCategory.findOne(
                {
                  name: {
                    $regex: `^${escapeRegex(
                      subCategoryName
                    )}$`,
                    $options: "i",
                  },
                }
              );

            if (subCategory) {
              subCategoryId =
                subCategory._id;
            }
          } catch (
            subCategoryError
          ) {
            console.log(
              "SubCategory model not available"
            );
          }
        }

        // ====================================
        // FIND EXISTING PRODUCT
        //
        // Priority:
        // 1. SKU
        // 2. Name + Brand + Category
        // ====================================

        let existingProduct =
          null;

        // First SKU
        if (row.sku?.trim()) {
          existingProduct =
            await Product.findOne({
              sku: row.sku.trim(),
            });
        }

        // Then Name + Brand + Category
        if (!existingProduct) {
          const productQuery = {
            name: {
              $regex: `^${escapeRegex(
                productName
              )}$`,
              $options: "i",
            },
          };

          if (brandId) {
            productQuery.brand =
              brandId;
          }

          if (categoryId) {
            productQuery.category =
              categoryId;
          }

          existingProduct =
            await Product.findOne(
              productQuery
            );
        }

        // ====================================
        // SLUG
        // ====================================

        let productSlug;

        if (existingProduct) {
          productSlug =
            await generateUniqueSlug(
              productName,
              existingProduct._id
            );
        } else {
          productSlug =
            await generateUniqueSlug(
              productName
            );
        }

        // ====================================
        // TAGS
        // ====================================

        let tags = [];

        if (row.tags?.trim()) {
          tags = row.tags
            .split(",")
            .map((tag) =>
              tag.trim()
            )
            .filter(Boolean);
        }

        // ====================================
        // PRODUCT DATA
        // ====================================

        const productData = {
          name: productName,

          slug: productSlug,

          description:
            row.description?.trim() ||
            "",

          brand:
            brandId,

          brandImage:
            brandImage || "",

          category:
            categoryId,

          subCategory:
            subCategoryId,

          productImage:
            row.productImage?.trim() ||
            null,

          listPrice:
            safeParseFloat(
              row.listPrice
            ),

          discountPrice:
            safeParseFloat(
              row.discountPrice
            ),

          weight:
            safeParseFloat(
              row.weight
            ),

          weightUnit:
            row.weightUnit?.trim() ||
            "kg",

          capacity:
            row.capacity?.trim() ||
            null,

          stock:
            safeParseInt(
              row.stock
            ),

          tags,

          isFeatured:
            parseBoolean(
              row.isFeatured
            ),

          ratings:
            safeParseFloat(
              row.ratings
            ),

          reviews:
            safeParseInt(
              row.reviews
            ),

          status:
            row.status?.trim() ||
            "active",
        };

        // ====================================
        // UPDATE EXISTING
        // ====================================

        if (existingProduct) {
          const updateData = {
            ...productData,

            // Existing SKU हमेशा preserve
            sku:
              existingProduct.sku ||
              row.sku?.trim() ||
              (await generateUniqueSKU(i)),

            // Existing image preserve
            // अगर CSV में image नहीं है
            // तो पुरानी image रहेगी
            productImage:
              row.productImage?.trim() ||
              existingProduct.productImage ||
              null,
          };

          await Product.findByIdAndUpdate(
            existingProduct._id,
            updateData,
            {
              new: true,
              runValidators: true,
            }
          );

          updated++;
        }

        // ====================================
        // CREATE NEW
        // ====================================

        else {
          let newSKU =
            row.sku?.trim() || "";

          // CSV SKU नहीं है
          if (!newSKU) {
            newSKU =
              await generateUniqueSKU(
                i
              );
          } else {
            // Check duplicate SKU
            const skuExists =
              await Product.findOne({
                sku: newSKU,
              });

            if (skuExists) {
              newSKU =
                await generateUniqueSKU(
                  i
                );
            }
          }

          const newProduct =
            new Product({
              ...productData,

              sku: newSKU,

              slug: productSlug,
            });

          await newProduct.save();

          created++;
        }
      } catch (rowError) {
        skipped++;

        console.error(
          `CSV Row ${i + 2} Error:`,
          rowError
        );

        errors.push({
          row: i + 2,
          message:
            rowError.message ||
            "Unknown error",
        });
      }
    }

    // ========================================
    // DELETE CSV FILE
    // ========================================

    try {
      if (
        csvFilePath &&
        fs.existsSync(csvFilePath)
      ) {
        fs.unlinkSync(
          csvFilePath
        );
      }
    } catch (deleteError) {
      console.log(
        "CSV file delete error:",
        deleteError.message
      );
    }

    // ========================================
    // RESPONSE
    // ========================================

    return res.status(200).json({
      message:
        "CSV import completed successfully",

      totalRows:
        rows.length,

      created,

      updated,

      skipped,

      success:
        created + updated,

      errors,
    });
  } catch (error) {
    console.error(
      "CSV Import Error:",
      error
    );

    // Cleanup uploaded CSV
    try {
      if (
        csvFilePath &&
        fs.existsSync(csvFilePath)
      ) {
        fs.unlinkSync(
          csvFilePath
        );
      }
    } catch (deleteError) {
      console.log(
        "CSV cleanup error:",
        deleteError.message
      );
    }

    return res.status(500).json({
      message:
        "Error importing CSV",

      error:
        error.message,
    });
  }
};