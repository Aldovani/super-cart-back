import { Field, InputType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class DeleteCategoryInput {
  @IsInt()
  @Field()
  categoryId: number;
}
