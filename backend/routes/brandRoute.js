import express from 'express';
import {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand
} from '../controllers/brandController.js';

import upload from '../middleware/upload.js';
import { verifyToken } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/brands',verifyToken, upload.single('brandImage'), createBrand);
router.get('/brands',verifyToken, getBrands);
router.get('/brands/:id',verifyToken, getBrandById);
router.put('/brands/:id', verifyToken, upload.single('brandImage'), updateBrand);
router.delete('/brands/:id',verifyToken, deleteBrand);

export default router;
