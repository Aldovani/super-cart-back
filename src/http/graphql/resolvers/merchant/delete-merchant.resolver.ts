import { Context, Mutation, Resolver } from '@nestjs/graphql';
import { MerchantService } from 'src/services/merchant.service';
import { GqlAuthGuard } from 'src/http/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { Merchant } from '../../models/merchant.model';
import { Response } from 'express';

@Resolver(() => Merchant)
export class DeleteMerchantResolver {
  constructor(private merchantService: MerchantService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteMerchant(
    @CurrentUser() user: AuthUser,
    @Context('res') res: Response,
  ) {
    await this.merchantService.delete(user.id);
    res.clearCookie('super_cart_token');

    return true;
  }
}
