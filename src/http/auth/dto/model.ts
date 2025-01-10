import { Field, ObjectType } from '@nestjs/graphql';
import { Merchant } from 'src/http/graphql/models/merchant.model';

@ObjectType()
export class Auth {
  @Field()
  token: string;

  @Field(() => Merchant)
  merchant: Merchant;
}
