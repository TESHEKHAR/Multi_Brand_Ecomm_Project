import express from 'express';
import upload from '../middleware/upload.js';
import { createSandiaProduct, getAllSandiaProducts } from '../controllers/sandiaProductController.js';


const router = express.Router();

const cpUpload = upload.fields([
    { name: "productImages", maxCount: 10 },
    { name: "literature", maxCount: 5 },
    { name: "accessoryImages", maxCount: 10 },
  ]);
router.post('/create-sandia-product',cpUpload, createSandiaProduct);
router.get('/get-sandia-products', getAllSandiaProducts);




export default router;
