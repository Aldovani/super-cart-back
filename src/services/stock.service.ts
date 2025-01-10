import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';
import { StringFilterOperation } from 'src/http/graphql/inputs/product/filter-product-input';
import { DateFilterOperation } from 'src/http/graphql/inputs/stock/query-stock-input';
import { PaginationProps } from './product.service';

type StockSearchQUery = {
  batch?: StringFilterOperation;
  createdAt?: DateFilterOperation;
};

@Injectable()
export class StockService {
  constructor(private prisma: PrismaService) {}

  getEntry(
    merchantId: string,
    filter?: StockSearchQUery,
    pagination?: PaginationProps,
  ) {
    return Promise.all([
      this.prisma.stockEntry.findMany({
        where: {
          merchantId,
          batch: filter.batch,
          createdAt: {
            gte: filter.createdAt?.gte
              ? new Date(filter.createdAt.gte)
              : undefined,
            lte: filter.createdAt?.lte
              ? new Date(filter.createdAt.lte)
              : undefined,
          },
        },
        skip: (pagination.skip - 1) * pagination.take || 0,
        take: pagination.take || 10,
      }),
      this.prisma.stockEntry.count({
        where: {
          merchantId,
          batch: filter.batch,
          createdAt: {
            gte: filter.createdAt?.gte
              ? new Date(filter.createdAt.gte)
              : undefined,
            lte: filter.createdAt?.lte
              ? new Date(filter.createdAt.lte)
              : undefined,
          },
        },
        skip: (pagination.skip - 1) * pagination.take || 0,
        take: pagination.take || 10,
      }),
    ]);
  }

  getOutput(
    merchantId: string,
    filter?: StockSearchQUery,
    pagination?: PaginationProps,
  ) {
    return Promise.all([
      this.prisma.stockOutput.findMany({
        where: {
          merchantId,
          batch: filter.batch,
          releaseDate: {
            gte: filter.createdAt?.gte
              ? new Date(filter.createdAt.gte)
              : undefined,
            lte: filter.createdAt?.lte
              ? new Date(filter.createdAt.lte)
              : undefined,
          },
        },
        skip: (pagination.skip - 1) * pagination.take || 0,
        take: pagination.take || 10,
      }),
      this.prisma.stockOutput.count({
        where: {
          merchantId,
          batch: filter.batch,
          releaseDate: {
            gte: filter.createdAt?.gte
              ? new Date(filter.createdAt.gte)
              : undefined,
            lte: filter.createdAt?.lte
              ? new Date(filter.createdAt.lte)
              : undefined,
          },
        },
        skip: (pagination.skip - 1) * pagination.take || 0,
        take: pagination.take || 10,
      }),
    ]);
  }
}
