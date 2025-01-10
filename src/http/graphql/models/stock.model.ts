import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StockModel {
  @Field(() => ID)
  id: number;

  @Field()
  quantity: number;

  @Field()
  batch: string;

  @Field()
  updatedAt: Date;

  @Field()
  type: string;

  @Field()
  createdAt: Date;

  productId: string;
}


@ObjectType()
export class QueryStock{
  @Field()
  first: number;

  @Field({ nullable: true })
  prev: number;

  @Field({ nullable: true })
  next: number;

  @Field()
  last: number;

  @Field()
  page: number;

  @Field()
  perPage: number;
  
  @Field()
  totalOfItem: number;

  @Field(() => [StockModel])
  data: StockModel[];
}