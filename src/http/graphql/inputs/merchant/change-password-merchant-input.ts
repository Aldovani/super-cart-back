import { Field, InputType } from '@nestjs/graphql';
import { IsStrongPassword } from 'class-validator';

@InputType()
export class ChangePasswordMerchantInput {
  @IsStrongPassword()
  @Field()
  currentPassword: string;

  @IsStrongPassword()
  @Field()
  newPassword: string;
}
