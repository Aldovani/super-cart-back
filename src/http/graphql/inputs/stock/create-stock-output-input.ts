import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStockOutputInput {
  @Field()
  batch: string;

  @Field()
  quantity: number;

  @Field()
  productId: string;

  @Field({ nullable: true })
  reason?: string;
}
