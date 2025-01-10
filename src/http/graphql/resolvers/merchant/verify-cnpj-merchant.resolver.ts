import { Args, Resolver, Query } from '@nestjs/graphql';
import { MerchantService } from 'src/services/merchant.service';
import { Merchant } from '../../models/merchant.model';
import { VerifyCNPJMerchantInput } from '../../inputs/merchant/verify-cnpj-merchant-input';

@Resolver(() => Merchant)
export class VerifyCNPJMerchantResolver {
  constructor(private merchantService: MerchantService) {}

  @Query(() => Boolean)
  async verifyCNPJMerchant(@Args('data') data: VerifyCNPJMerchantInput) {
    const alreadyExistMerchantWithSameCNPJ =
      await this.merchantService.findByCNPJ(data.cnpj);

    if (alreadyExistMerchantWithSameCNPJ) {
      return true;
    }

    return false;
  }
}
