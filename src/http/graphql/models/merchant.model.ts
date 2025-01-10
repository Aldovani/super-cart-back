import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { prefixLocalUploadsMiddleware } from './product.model';

export enum MerchantType {
  SUPERMARKET = 'SUPERMARKET',
  GREEN_GROCER = 'GREEN_GROCER',
  BUTCHER = 'BUTCHER',
  BAKERY = 'BAKERY',
  MINIMATKETS = 'MINIMATKETS',
  ICE_CREAM_PARLOR = 'ICE_CREAM_PARLOR',
}

registerEnumType(MerchantType, {
  name: 'MerchantType',
  description: 'Merchant Type',
});

@ObjectType()
export class Merchant {
  @Field(() => ID)
  id: string;

  @Field()
  corporateName: string;

  @Field()
  tradeName: string;

  @Field({ nullable: true, middleware: [prefixLocalUploadsMiddleware] })
  logoUrl: string;

  @Field({ nullable: true, middleware: [prefixLocalUploadsMiddleware] })
  bannerUrl: string;

  @Field()
  cnpj: string;

  @Field()
  isActive: boolean;

  @Field()
  isValidated: boolean;

  @Field()
  isEmailValidated: boolean;

  @Field()
  email: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  minDeliveryValue: number;

  @Field(() => MerchantType)
  type: MerchantType;
}
