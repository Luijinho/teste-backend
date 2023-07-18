import { Controller, Get, Param, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../models/product.model';
import { Response } from 'express';

// Placeholder Data
const initialProducts = [
  {
    productId: "192663",
    price: 267,
  },
  {
    productId: "1",
    price: 10,
  },
  {
    productId: "2",
    price: 20,
  },
];

@Controller('products')
export class ProductsController {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {
    this.addProducts();
  }

  private async addProducts(): Promise<void> {
    const productsCount = await this.productModel.countDocuments().exec();
    if (productsCount === 0) {
      await this.productModel.insertMany(initialProducts);
    }
  }

  @Get()
  async getAllProducts(@Res() res: Response) {
    const products = await this.productModel.find().exec();
    return res.status(200).json({ data: products, message: 'Products retrieved successfully' });
  }

  @Get(':id')
  async getProduct(@Param('id') id: string, @Res() res: Response) {
    const product = await this.productModel.findOne({ productId: id }).exec();

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ data: product, message: 'Product retrieved successfully' });
  }
}
