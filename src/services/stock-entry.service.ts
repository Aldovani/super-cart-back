import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

type CreateStockEntryPayload = {
  batch: string;
  expirationDate: Date;
  quantity: number;
  merchantId: string;
  productId: string;
};

@Injectable()
export class StockEntryService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateStockEntryPayload) {
    return this.prisma.stockEntry.create({
      data,
    });
  }
}
