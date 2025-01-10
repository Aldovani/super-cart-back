import { Args, Resolver, Query } from '@nestjs/graphql';
import { MerchantService } from 'src/services/merchant.service';
import { Merchant } from '../../models/merchant.model';
import { VerifyEmailMerchantInput } from '../../inputs/merchant/verify-email-merchant-input';

@Resolver(() => Merchant)
export class VerifyEmailMerchantResolver {
  constructor(private merchantService: MerchantService) {}

  @Query(() => Boolean)
  async verifyEmailMerchant(@Args('data') data: VerifyEmailMerchantInput) {
    const alreadyExistMerchantWithSameEmail =
      await this.merchantService.findByEmail(data.email);

    if (alreadyExistMerchantWithSameEmail) {
      return true;
    }

    return false;
  }
}
