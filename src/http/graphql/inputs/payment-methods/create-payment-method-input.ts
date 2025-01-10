import { Field, InputType } from '@nestjs/graphql';
import { PaymentMethodType } from '../../models/payment-method.model';

@InputType()
export class CreatePaymentMethodInput {
  @Field()
  name: string;

  @Field(() => PaymentMethodType)
  type: PaymentMethodType;
}
