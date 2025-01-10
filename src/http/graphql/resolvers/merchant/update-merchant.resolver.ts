import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { MerchantService } from 'src/services/merchant.service';
import { Merchant } from '../../models/merchant.model';
import { GqlAuthGuard } from 'src/http/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { UpdateMerchantInput } from '../../inputs/merchant/update-merchant-input';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';

@Resolver(() => Merchant)
export class UpdateMerchantResolver {
  constructor(private merchantService: MerchantService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Merchant)
  async updateMerchant(
    @Args('data') data: UpdateMerchantInput,
    @CurrentUser() user: AuthUser,
  ) {
    const merchant = await this.merchantService.update(user.id, data);

    return merchant;
  }
}
