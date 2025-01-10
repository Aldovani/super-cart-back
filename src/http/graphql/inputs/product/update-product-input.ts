import { Field, InputType, Int } from '@nestjs/graphql';
import { ProductStatus, ProductUnit } from '../../models/product.model';
import { ArrayMinSize } from 'class-validator';

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true })
  productId: string;

  @Field({ nullable: true })
  name: string;

  @ArrayMinSize(1)
  @Field(() => [Int], { nullable: 'itemsAndList' })
  categories: number[];

  @Field({ nullable: true })
  description: string;

  @Field(() => ProductUnit, { nullable: true })
  unit: ProductUnit;

  @Field({ nullable: true })
  salesPrice: number;

  @Field({ nullable: true })
  costPrice: number;

  @Field(() => ProductStatus, { nullable: true })
  status: ProductStatus;
}
