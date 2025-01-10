import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsPositive,
  IsBoolean,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { IsCnpj } from 'src/validators/is-cnpj';
import { MerchantType } from '../../models/merchant.model';

@InputType()
export class UpdateMerchantInput {
  @IsCnpj()
  @IsOptional()
  @Field({ nullable: true })
  cnpj: string;
  
  @IsEmail()
  @IsOptional()
  @Field({ nullable: true })
  email: string;
  
  @IsOptional()
  @Field({ nullable: true })
  corporateName: string;
  
  @IsOptional()
  @Field({ nullable: true })
  tradeName?: string;
  
  @IsOptional()
  @Field({ nullable: true })
  description?: string;
  
  @IsBoolean()
  @IsOptional()
  @Field({ nullable: true })
  isActive: boolean;
  
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Field({ nullable: true })
  minDeliveryValue: number;
  
  @IsOptional()
  @Field(() => MerchantType, { nullable: true })
  type: MerchantType;
}
