import createHttpError from 'http-errors';
import { Product } from '../models/product.js';

export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
};

export const getProductById = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);

  if (!product) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(product);
};

export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const newProduct = await Product.findOneAndUpdate(
    { _id: productId },
    req.body,
    { new: true },
  );
  if (!newProduct) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json(newProduct);
};
