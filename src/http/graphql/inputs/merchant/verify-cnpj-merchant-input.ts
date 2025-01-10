import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class VerifyCNPJMerchantInput {
  @Field()
  cnpj: string;
}
