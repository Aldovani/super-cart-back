import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStockEntryInput {
  @Field()
  batch: string;

  @Field()
  expirationDate: Date;

  @Field()
  quantity: number;

  @Field()
  productId: string;
}
