import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PaymentMethodsService } from 'src/services/payment-method.service';
import { PaymentMethod } from '../../models/payment-method.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/http/auth/jwt-auth.guard';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';

@Resolver(() => PaymentMethod)
export class UpdateRelationMerchantAndPaymentMethodResolve {
  constructor(private paymentMethodsService: PaymentMethodsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async updateRelationMerchantAndPaymentMethod(
    @Args('paymentMethodId', { type: () => String })
    paymentMethodId: string,
    @CurrentUser() user: AuthUser,
  ) {
    const merchantPaymentMethods =
      await this.paymentMethodsService.findByMerChantId(user.id);
    const currentPaymentMethods = merchantPaymentMethods.map(
      (item) => item.paymentMethodId,
    );

    if (currentPaymentMethods.includes(paymentMethodId)) {
      await this.paymentMethodsService.deleteRelationMerchantAndPaymentMethod({
        merchantId: user.id,
        paymentMethodId,
      });
      return true;
    }

    await this.paymentMethodsService.updateRelationMerchantAndPaymentMethod({
      merchantId: user.id,
      paymentMethodId,
    });

    return true;
  }
}
