import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
  @Field({ nullable: true })
  perPage: number;

  @Field({ nullable: true })
  page: number;
}
