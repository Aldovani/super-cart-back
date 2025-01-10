import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';
import { ProductUnit } from '@prisma/client';
import {
  NumberFilterOperation,
  StringFilterOperation,
} from 'src/http/graphql/inputs/product/filter-product-input';
import { ProductStatus } from 'src/http/graphql/models/product.model';

type Product = {
  name: string;
  description: string;
  imgUrl: string;
  unit: ProductUnit;
  status: ProductStatus;
  salesPrice: number;
  costPrice: number;
};

type Category = {
  categoryId: number;
};

type CreateProductProps = {
  merchantId: string;
  categories: Category[];
} & Omit<Product, 'status'>;

type UpdateProductProps = {
  merchantId?: string;
  id: string;
  deleteCategories?: number[];
  addCategories?: number[];
} & Partial<Product>;

type ProductSearchQUery = {
  name?: StringFilterOperation;
  status?: ProductStatus;
  categories: {
    name: StringFilterOperation;
    id: NumberFilterOperation;
  };
  costPrice: NumberFilterOperation;
};

export type PaginationProps = {
  take: number;
  skip: number;
};

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateProductProps) {
    return this.prisma.product.create({
      data: {
        costPrice: data.costPrice,
        description: data.description,
        imgUrl: data.imgUrl,
        name: data.name,
        salesPrice: data.salesPrice,
        unit: data.unit,
        merchantId: data.merchantId,
        ProductCategories: {
          createMany: {
            data: data.categories,
          },
        },
      },
    });
  }

  update(data: UpdateProductProps) {
    return this.prisma.product.update({
      data: {
        costPrice: data.costPrice,
        description: data.description,
        imgUrl: data.imgUrl,
        name: data.name,
        salesPrice: data.salesPrice,
        unit: data.unit,
        status: data.status,
        merchantId: data.merchantId,
        ProductCategories: {
          createMany: {
            skipDuplicates: true,
            data: data.addCategories.map((categoryId) => ({
              categoryId,
            })),
          },
          delete: data.deleteCategories.map((categoryId) => ({
            productId_categoryId: {
              categoryId,
              productId: data.id,
            },
          })),
        },
      },
      where: {
        id: data.id,
      },
    });
  }

  delete(productId: string) {
    return this.prisma.product.delete({
      where: {
        id: productId,
      },
    });
  }

  findManyByMerchantId(
    merchantId: string,
    filter?: ProductSearchQUery,
    pagination?: PaginationProps,
  ) {
    return Promise.all([
      this.prisma.product.findMany({
        where: {
          merchantId,
          name: { ...filter.name, mode: 'insensitive' },
          status: filter.status === null ? undefined : filter.status,
          ProductCategories: {
            some: {
              category: {
                id: {
                  in: filter?.categories?.id?.in?.length
                    ? filter.categories.id.in
                    : undefined,
                },
                name: {
                  in: filter?.categories?.name?.in?.length
                    ? filter.categories.name.in
                    : undefined,
                  mode: 'insensitive',
                },
              },
            },
          },
          costPrice: {
            ...filter.costPrice,
          },
        },
        skip: (pagination.skip - 1) * pagination.take || 0,
        take: pagination.take || 10,
      }),
      this.prisma.product.count({
        where: {
          merchantId,
          name: { ...filter.name, mode: 'insensitive' },
          status: filter.status === null ? undefined : filter.status,
          ProductCategories: {
            some: {
              category: {
                id: {
                  in: filter?.categories?.id?.in?.length
                    ? filter.categories.id.in
                    : undefined,
                },
                name: {
                  in: filter?.categories?.name?.in?.length
                    ? filter.categories.name.in
                    : undefined,
                  mode: 'insensitive',
                },
              },
            },
          },
          costPrice: {
            ...filter.costPrice,
          },
        },
      }),
    ]);
  }

  findById(productId: string) {
    return this.prisma.product.findFirst({
      where: {
        id: productId,
      },
    });
  }

  getMinMaxCostProductByMerchantId(merchantId: string) {
    return this.prisma.product.aggregate({
      _max: { costPrice: true },
      _min: { costPrice: true },

      where: {
        merchantId,
      },
    });
  }
}
