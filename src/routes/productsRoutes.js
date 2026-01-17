import { Router } from 'express';
import {
  getAllProducts,
  getProductById
 } from '../controllers/productsController.js';

const router = Router();

router.get('/products', getAllProducts);
router.get('/products/:productId', getProductById);

export default router;
