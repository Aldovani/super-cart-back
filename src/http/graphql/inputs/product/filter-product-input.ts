import { Field, InputType, Int } from '@nestjs/graphql';
import { ProductStatus } from '../../models/product.model';

export type StringFilterOperation = {
  contains?: string;
  endsWith?: string;
  equals?: string;
  startsWith?: string;
  in?: string[];
};

export type NumberFilterOperation = {
  lte?: number;
  gte?: number;
  equals?: number;
  gt?: number;
  lt?: number;
  in?: number[];
};

@InputType()
export class StringQueryInput {
  @Field({ nullable: true })
  contains?: string;

  @Field({ nullable: true })
  endsWith?: string;

  @Field({ nullable: true })
  equals?: string;

  @Field({ nullable: true })
  startsWith?: string;
}

@InputType()
export class NumberQueryInput {
  @Field({ nullable: true })
  lte?: number;

  @Field({ nullable: true })
  gte?: number;

  @Field({ nullable: true })
  equals?: number;

  @Field({ nullable: true })
  gt?: number;

  @Field({ nullable: true })
  lt?: number;

  @Field(() => [Int], { nullable: true })
  in?: number[];
}

@InputType()
export class FilterProductCategoriesInput {
  @Field(() => NumberQueryInput, { nullable: true })
  id: NumberQueryInput;

  @Field(() => StringQueryInput, { nullable: true })
  name: StringQueryInput;
}

@InputType()
export class FilterProductInput {
  @Field(() => StringQueryInput, { nullable: true })
  name: StringFilterOperation;

  @Field(() => ProductStatus, { nullable: true })
  status: ProductStatus;

  @Field(() => FilterProductCategoriesInput, { nullable: true })
  categories: FilterProductCategoriesInput;

  @Field(() => NumberQueryInput, { nullable: true })
  costPrice: NumberQueryInput;
}
