import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products/products.controller';
import { Product, ProductSchema } from './models/product.model';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongodb/products'), MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
  controllers: [ProductsController],
})
export class AppModule {}
