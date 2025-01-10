import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, Length } from 'class-validator';

@InputType()
export class UpdateCategoryInput {
  @IsNotEmpty()
  @IsInt()
  @Field()
  id: number;

  @IsNotEmpty()
  @Length(4)
  @Field()
  name: string;

  @IsNotEmpty()
  @Length(20)
  @Field()
  description: string;
}
