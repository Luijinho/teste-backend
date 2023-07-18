import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProductsController } from './products/products.controller';
import { CartsController } from './carts/carts.controller';

@Module({
  imports: [HttpModule],
  controllers: [ProductsController, CartsController]
})

export class AppModule {}
