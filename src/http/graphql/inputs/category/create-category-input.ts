import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @IsNotEmpty()
  @Length(4)
  @Field()
  name: string;

  @IsNotEmpty()
  @Length(20)
  @Field()
  description: string;
}
