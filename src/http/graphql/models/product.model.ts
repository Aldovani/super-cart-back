import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

export enum ProductUnit {
  Kilogram = 'Kilogram',
  Gram = 'Gram',
  Liter = 'Liter',
  Milliliter = 'Milliliter',
  Piece = 'Piece',
  Box = 'Box',
  Pack = 'Pack',
  Dozen = 'Dozen',
  Meter = 'Meter',
  Centimeter = 'Centimeter',
}

export enum ProductStatus {
  unavailable = 'unavailable',
  available = 'available',
  preparation = 'preparation',
}

registerEnumType(ProductUnit, {
  name: 'ProductUnit',
  description: 'Product Unit',
});

registerEnumType(ProductStatus, {
  name: 'ProductStatus',
  description: 'Product Status',
});

export const prefixLocalUploadsMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const value = await next();
  if (value) {
    return 'http://localhost:7777/uploads/' + value;
  }

  return value;
};

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  salesPrice: number;

  @Field()
  costPrice: number;

  @Field({
    middleware: [prefixLocalUploadsMiddleware],
  })
  imgUrl: string;

  @Field(() => ProductUnit)
  unit: ProductUnit;

  @Field(() => ProductStatus)
  status: ProductStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAte: Date;
}

@ObjectType()
export class QueryProduct {
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

  @Field(() => [Product])
  data: Product[];
}


@ObjectType()
export class MinMaxProduct {
  @Field()
  min: number;
  
  @Field()
  max: number;
}
