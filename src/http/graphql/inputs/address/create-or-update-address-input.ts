import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';

@InputType()
export class CreateOrUpdateAddressInput {
  @IsOptional()
  @Field({ nullable: true })
  id: number;

  @IsNotEmpty()
  @Length(8)
  @Field()
  cep: string;

  @IsNotEmpty()
  @Length(4)
  @Field()
  city: string;

  @IsNotEmpty()
  @Length(4)
  @Field()
  district: string;

  @IsNotEmpty()
  @Length(2)
  @Field()
  state: string;

  @IsNotEmpty()
  @Length(4)
  @Field()
  street: string;
}
