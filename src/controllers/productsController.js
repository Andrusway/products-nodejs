import createHttpError from 'http-errors';
import { Product } from '../models/product.js';

export const getAllProducts = async (req, res) => {
  const products = await Product.find({ userId: req.user._id });
  res.status(200).json(products);
};

export const getProductById = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findOne({
    _id: productId,
    userId: req.user._id,
  });

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json(product);
};

export const createProduct = async (req, res) => {
  const product = await Product.create({ ...req.body, userId: req.user._id });
  res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const newProduct = await Product.findOneAndUpdate(
    { _id: productId, userId: req.user._id },
    req.body,
    { new: true },
  );
  if (!newProduct) {
    throw createHttpError(404, 'Product not found');
  }
  res.status(200).json(newProduct);
};

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findOneAndDelete({
    _id: productId,
    userId: req.user._id,
  });
  if (!product) {
    throw createHttpError(404, 'Product not found by this ID');
  }
  res.status(200).json(product);
};
