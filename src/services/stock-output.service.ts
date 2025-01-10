import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

type CreateStockOutputPayload = {
  batch: string;
  quantity: number;
  merchantId: string;
  productId: string;
  reason?: string;
};

@Injectable()
export class StockOutputService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateStockOutputPayload) {
    return this.prisma.stockOutput.create({
      data
    });

   
  }
}
