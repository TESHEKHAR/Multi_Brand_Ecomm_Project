import express from 'express';
import {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand
} from '../controllers/brandController.js';

import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/brands', upload.single('brandImage'), createBrand);
router.get('/brands', getBrands);
router.get('/brands/:id', getBrandById);
router.put('/brands/:id', upload.single('brandImage'), updateBrand);
router.delete('/brands/:id', deleteBrand);

export default router;
