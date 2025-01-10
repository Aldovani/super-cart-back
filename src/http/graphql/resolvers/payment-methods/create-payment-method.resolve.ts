import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreatePaymentMethodInput } from '../../inputs/payment-methods/create-payment-method-input';
import { PaymentMethodsService } from 'src/services/payment-method.service';
import { PaymentMethod } from '../../models/payment-method.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/http/auth/jwt-auth.guard';

@Resolver(() => PaymentMethod)
export class CreatePaymentMethodResolve {
  constructor(private paymentMethodsService: PaymentMethodsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => PaymentMethod)
  async createPaymentMethod(@Args('data') data: CreatePaymentMethodInput) {
    const paymentMethod = await this.paymentMethodsService.create(data);

    return paymentMethod;
  }
}
