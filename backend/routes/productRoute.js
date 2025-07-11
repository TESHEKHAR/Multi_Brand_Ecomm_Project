import express from 'express';
import upload from '../middleware/upload.js';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct
} from '../controllers/productController.js';
import Product from '../models/Product.js';

const router = express.Router();
router.post('/create-product', upload.single('productImage'), createProduct);

router.get('/products', getProducts);

router.get('/product/:id', getProductById);

router.put('/product/:id', upload.single('productImage'), updateProduct);

router.delete('/product/:id', deleteProduct);

// routes/productRoutes.js

router.get('/brand/:brandName', async (req, res) => {
  try {
    const brandSlug = req.params.brandName.replace(/-/g, " ").toLowerCase();

    const products = await Product.find()
      .populate('brand');

    const filtered = products.filter(
      (p) => p.brand?.name?.toLowerCase() === brandSlug
    );

    res.status(200).json(filtered);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching brand products',
      error: error.message,
    });
  }
});


export default router;
