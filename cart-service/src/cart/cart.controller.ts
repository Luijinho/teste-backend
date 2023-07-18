import { Controller, Get, Post, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Cart, CartProduct } from '../models/cart.model';

@Controller('cart')
export class CartController {
  constructor(@InjectRepository(Cart) private cartRepository: Repository<Cart>) {}

  @Get(':userId')
  async getCart(@Param('userId') userId: string) {
    const options: FindOneOptions<Cart> = {
      where: { userId: userId },
    };

    const cart = await this.cartRepository.findOne(options);

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return cart;
  }

  @Post(':userId')
  async addProductToCart(
      @Param('userId') userId: string, 
      @Body() productData: CartProduct) 
  {
    let cart = await this.cartRepository.findOne({ where: { userId: userId } });

    if (!cart) {
      cart = new Cart();
      cart.userId = userId;
      cart.totalPrice = 0;
      cart.totalQuantity = 0;
      cart.products = [];
    }

    cart.totalPrice += productData.price;
    cart.totalQuantity += 1;

    const newProduct: CartProduct = {
      productId: productData.productId,
      price: productData.price,
      quantity: 1,
    };

    if (!cart.products) {
      cart.products = [];
    }

    cart.products.push(newProduct);

    await this.cartRepository.save(cart);
  }

  @Delete(':userId/product/:productId')
  async removeProductFromCart(
    @Param('userId') userId: string, 
    @Param('productId') productId: string
  ) {
    const cart = await this.cartRepository.findOne({ where: { userId: userId } });

    if (cart) {
      const productIndex = cart.products.findIndex((product) => product.productId === productId);

      if (productIndex !== -1) {
        const productToRemove = cart.products.splice(productIndex, 1)[0];
        cart.totalPrice -= productToRemove.price;
        cart.totalQuantity -= 1;
        await this.cartRepository.save(cart);
      }
    }
  }
}
