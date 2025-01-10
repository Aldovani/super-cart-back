import { Field, InputType } from '@nestjs/graphql';
import {
  StringFilterOperation,
  StringQueryInput,
} from '../product/filter-product-input';

export type DateFilterOperation = {
  lte?: string;
  gte?: string;
};

@InputType()
export class DateInput {
  @Field({ nullable: true })
  gte: string;

  @Field({ nullable: true })
  lte: string;
}

@InputType()
export class QueryStockInput {
  @Field({ nullable: true })
  type: string;

  @Field(() => DateInput, { nullable: true })
  createdAt: DateFilterOperation;

  @Field(() => StringQueryInput, { nullable: true })
  batch: StringFilterOperation;
}
