import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRelationMerchantAndPaymentMethodInput {
  @Field()
  paymentMethodId: string;
}
