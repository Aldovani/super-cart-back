import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { PaymentMethodsService } from 'src/services/payment-method.service';
import { GetPaymentMethodResolve } from './get-payment-method.resolve';
import { CreatePaymentMethodResolve } from './create-payment-method.resolve';
import { UpdateRelationMerchantAndPaymentMethodResolve } from './update-relation-merchant-and-payment-method.resolve';

@Module({
  imports: [DatabaseModule],
  controllers: [],

  providers: [
    PaymentMethodsService,
    GetPaymentMethodResolve,
    CreatePaymentMethodResolve,
    UpdateRelationMerchantAndPaymentMethodResolve,
  ],
})
export class PaymentMethodsModel {}
