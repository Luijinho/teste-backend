import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  shoppingCartId: number;

  @Column()
  userId: string;

  @Column()
  totalPrice: number;

  @Column()
  totalQuantity: number;

  @Column('jsonb', { nullable: true })
  products: CartProduct[];
}

export interface CartProduct {
  productId: string;
  price: number;
  quantity: number;
}