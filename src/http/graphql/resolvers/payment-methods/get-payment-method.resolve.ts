import { Query, Resolver } from '@nestjs/graphql';
import { PaymentMethodsService } from 'src/services/payment-method.service';
import { PaymentMethod } from '../../models/payment-method.model';
import { GqlAuthGuard } from 'src/http/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';

@Resolver(() => PaymentMethod)
export class GetPaymentMethodResolve {
  constructor(private paymentMethodsService: PaymentMethodsService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [PaymentMethod])
  async getPaymentMethod(@CurrentUser() user: AuthUser) {
    const paymentMethods = await this.paymentMethodsService.get();

    const merchantPaymentMethods =
      await this.paymentMethodsService.findByMerChantId(user.id);

    const merchantPaymentMethodsId = merchantPaymentMethods.map(
      (item) => item.paymentMethodId,
    );

    const paymentMethodsSelected = paymentMethods.map((payment) =>
      merchantPaymentMethodsId.includes(payment.id)
        ? {
            ...payment,
            selected: true,
          }
        : { ...payment, selected: false },
    );

    return paymentMethodsSelected;
  }
}
