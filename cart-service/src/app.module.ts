import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart/cart.controller';
import { Cart } from './models/cart.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgresql',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'testedbnew',
      entities: [Cart],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Cart]),
  ],
  controllers: [CartController],
})
export class AppModule {}
