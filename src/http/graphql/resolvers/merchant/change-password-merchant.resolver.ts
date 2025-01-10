import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { MerchantService } from 'src/services/merchant.service';
import { hash, compare } from 'bcrypt';
import { Merchant } from '../../models/merchant.model';
import { GqlAuthGuard } from 'src/http/auth/jwt-auth.guard';
import { HttpException, UseGuards } from '@nestjs/common';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { ChangePasswordMerchantInput } from '../../inputs/merchant/change-password-merchant-input';

@Resolver(() => Merchant)
export class ChangePasswordMerchantResolver {
  constructor(private merchantService: MerchantService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async changePasswordMerchant(
    @Args('data') data: ChangePasswordMerchantInput,
    @CurrentUser() user: AuthUser,
  ) {
    const isSamePassword = await compare(data.currentPassword, user.password);

    if (!isSamePassword) {
      throw new HttpException('Current password invalid', 400);
    }

    const passwordHashed = await hash(data.newPassword, 8);

    await this.merchantService.update(user.id, {
      password: passwordHashed,
    });

    return true;
  }
}
