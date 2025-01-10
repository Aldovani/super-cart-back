import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';
import { MerchantType } from '@prisma/client';

type createMerchantProps = {
  cnpj: string;
  email: string;
  password: string;
  corporateName: string;
  tradeName: string;
  type: MerchantType;
};

type updateMerchantProps = {
  cnpj?: string;
  email?: string;
  corporateName?: string;
  tradeName?: string;
  bannerUrl?: string;
  logoUrl?: string;
  isActive?: boolean;
  password?: string;
  description?: string;
  minDeliveryValue?: number;
  type?: MerchantType;
};

@Injectable()
export class MerchantService {
  constructor(private prisma: PrismaService) {}

  findByCNPJ(cnpj: string) {
    return this.prisma.merchant.findFirst({
      where: {
        cnpj,
      },
    });
  }

  findByEmail(email: string) {
    return this.prisma.merchant.findFirst({
      where: {
        email,
      },
    });
  }

  findByID(id: string) {
    return this.prisma.merchant.findFirst({
      where: {
        id,
      },
    });
  }

  create({
    cnpj,
    email,
    password,
    corporateName,
    tradeName,
    type,
  }: createMerchantProps) {
    return this.prisma.merchant.create({
      data: {
        cnpj,
        corporateName,
        tradeName,
        email,
        password,
        type,
      },
    });
  }

  update(merchantId: string, data: updateMerchantProps) {
    return this.prisma.merchant.update({
      data: { ...data },
      where: {
        id: merchantId,
      },
    });
  }

  delete(merchantId: string) {
    return this.prisma.merchant.delete({
      where: {
        id: merchantId,
      },
    });
  }

  list() {
    return this.prisma.merchant.findMany({
      where: {
        isActive: true,
        isValidated: true,
      },
    });
  }
}
