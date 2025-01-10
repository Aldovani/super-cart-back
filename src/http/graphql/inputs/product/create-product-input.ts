import { Field, InputType, Int } from '@nestjs/graphql';
import { ProductUnit } from '../../models/product.model';
import { ArrayMinSize, IsNotEmpty, IsPositive } from 'class-validator';

@InputType()
export class CreateProductInput {
  @IsNotEmpty()
  @Field()
  name: string;

  @IsNotEmpty()
  @Field()
  description: string;

  @IsNotEmpty()
  @Field(() => ProductUnit)
  unit: ProductUnit;
  
  @ArrayMinSize(1)
  @Field(() => [Int])
  categories: number[];
  
  @IsPositive()
  @Field()
  salesPrice: number;
  
  @IsPositive()
  @Field()
  costPrice: number;
}
