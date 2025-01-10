import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';
import { PaymentMethodType } from 'src/http/graphql/models/payment-method.model';

type CreatePaymentMethodProps = {
  name: string;
  type: PaymentMethodType;
};

type updateRelationMerchantAndPaymentMethodProps = {
  merchantId: string;
  paymentMethodId: string;
};
type DeleteRelationMerchantAndPaymentMethodProps = {
  merchantId: string;
  paymentMethodId: string;
};

@Injectable()
export class PaymentMethodsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreatePaymentMethodProps) {
    return this.prisma.paymentMethods.create({ data });
  }

  delete(paymentMethodId: string) {
    return this.prisma.paymentMethods.delete({
      where: { id: paymentMethodId },
    });
  }

  get() {
    return this.prisma.paymentMethods.findMany();
  }

  updateRelationMerchantAndPaymentMethod({
    merchantId,
    paymentMethodId,
  }: updateRelationMerchantAndPaymentMethodProps) {
    return this.prisma.merchantPaymentMethods.create({
      data: {
        paymentMethodId,
        merchantId,
      },
    });
  }
  deleteRelationMerchantAndPaymentMethod({
    merchantId,
    paymentMethodId,
  }: DeleteRelationMerchantAndPaymentMethodProps) {
    return this.prisma.merchantPaymentMethods.delete({
      where: {
        merchantId_paymentMethodId: { merchantId, paymentMethodId },
      },
    });
  }

  findByMerChantId(merchantId: string) {
    return this.prisma.merchantPaymentMethods.findMany({
      where: {
        merchantId,
      },
    });
  }
}
