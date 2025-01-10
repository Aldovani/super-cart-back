import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { IsCnpj } from 'src/validators/is-cnpj';

@InputType()
export class SignInput {
  @IsCnpj()
  @IsNotEmpty()
  @Field()
  cnpj: string;

  @IsNotEmpty()
  @Field()
  password: string;
}
