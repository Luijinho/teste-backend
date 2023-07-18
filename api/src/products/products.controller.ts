import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Controller('products')
export class ProductsController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  async getAllProducts() {
    try {
      const response = await this.httpService.get('http://product-service:3001/products').toPromise();
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new HttpException('Products not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    try {
      const response = await this.httpService.get(`http://product-service:3001/products/${id}`).toPromise();
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
