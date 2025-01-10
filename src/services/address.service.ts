import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

type AddressProps = {
  id?: number;
  cep: string;
  city: string;
  district: string;
  state: string;
  street: string;
  merchantId: string;
};

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  findByMerchantID(merchantId: string) {
    return this.prisma.address.findFirst({
      where: {
        merchantId,
      },
    });
  }

  createOrUpdate(data: AddressProps) {
    return this.prisma.address.upsert({
      create: {
        cep: data.cep,
        city: data.city,
        district: data.district,
        state: data.state,
        street: data.street,
        merchant: {
          connect: { id: data.merchantId },
        },
      },
      update: {
        cep: data.cep,
        city: data.city,
        district: data.district,
        state: data.state,
        street: data.street,
        merchant: {
          connect: { id: data.merchantId },
        },
      },
      where: {
        merchantId: data.merchantId,
      },
    });
  }
}
