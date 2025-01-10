import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsStrongPassword } from 'class-validator';
import { IsCnpj } from 'src/validators/is-cnpj';
import { MerchantType } from '../../models/merchant.model';

@InputType()
export class CreateMerchantInput {
  @IsCnpj()
  @Field()
  cnpj: string;

  @IsEmail()
  @Field()
  email: string;

  @IsStrongPassword()
  @Field()
  password: string;

  @Field()
  tradeName: string;

  @Field()
  corporateName: string;

  @Field(() => MerchantType)
  type: MerchantType;
}
