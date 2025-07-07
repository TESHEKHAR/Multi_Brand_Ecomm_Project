import express from 'express';
import upload from '../middleware/upload.js';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct
} from '../controllers/productController.js';

const router = express.Router();
router.post('/create-product', upload.single('productImage'), createProduct);

router.get('/products', getProducts);

router.get('/product/:id', getProductById);

router.put('/product/:id', upload.single('productImage'), updateProduct);

router.delete('/product/:id', deleteProduct);

export default router;
