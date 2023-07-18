import { Controller, Get, Post, Delete, Param, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Controller('cart')
export class CartsController {
  constructor(private readonly httpService: HttpService) {}

  @Get(':userId')
  async getCart(@Param('userId') userId: string) {
    try {
      const response = await this.httpService.get(`http://cart-service:3002/cart/${userId}`).toPromise();
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post(':userId/product/:productId')
  async addProductToCart(@Param('userId') userId: string, @Param('productId') productId: string) {
    try {
      const product = await this.httpService.get(`http://product-service:3001/products/${productId}`).toPromise();
      const productData = product.data.data;
      await this.httpService.post(`http://cart-service:3002/cart/${userId}`, productData).toPromise();

      return {
        message: 'Product added to cart successfully',
      };
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':userId/product/:productId')
  async removeProductFromCart(@Param('userId') userId: string, @Param('productId') productId: string) {
    try {
      await this.httpService.delete(`http://cart-service:3002/cart/${userId}/product/${productId}`).toPromise();
      return {
        message: 'Product removed from cart successfully'
      };
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new HttpException('Cart or product not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
