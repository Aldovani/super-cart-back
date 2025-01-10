import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class VerifyEmailMerchantInput {
  @IsEmail()
  @Field()
  email: string;
}
