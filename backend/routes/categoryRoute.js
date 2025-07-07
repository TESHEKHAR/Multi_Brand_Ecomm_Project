import express from 'express';
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from '../controllers/categoryController.js';

const router = express.Router();

router.post('/create-category', createCategory);
router.get('/get-category',getCategories);
router.get('/categories/:id',getCategoryById);
router.put('/categories/:id',updateCategory);
router.delete('/categories/:id', deleteCategory);

export default router;