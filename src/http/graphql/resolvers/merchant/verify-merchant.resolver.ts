import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { MerchantService } from 'src/services/merchant.service';
import { Merchant } from '../../models/merchant.model';
import { GqlAuthGuard } from 'src/http/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { ChangePasswordMerchantInput } from '../../inputs/merchant/change-password-merchant-input';

@Resolver(() => Merchant)
export class VerifyMerchantResolver {
  constructor(private merchantService: MerchantService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async VerifyMerchant(
    @Args('data') data: ChangePasswordMerchantInput,
    @CurrentUser() user: AuthUser,
  ) {
    return true;
  }
}
