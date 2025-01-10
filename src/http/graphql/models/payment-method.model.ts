import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum PaymentMethodType {
  local = 'local',
  online = 'online',
}

registerEnumType(PaymentMethodType, {
  name: 'PaymentMethodType',
  description: 'Payment Method Type',
});

@ObjectType()
export class PaymentMethod {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => PaymentMethodType)
  type: PaymentMethodType;

  @Field({ nullable: true, defaultValue: false })
  selected: boolean;
}
