import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/http/auth/jwt-auth.guard';
import { ProductService } from 'src/services/product.service';
import { StockService } from 'src/services/stock.service';
import { QueryStock, StockModel } from '../../models/stock.model';
import { Product } from '../../models/product.model';
import { QueryStockInput } from '../../inputs/stock/query-stock-input';
import { PaginationInput } from '../../inputs/utils/pagination-input';

@Resolver(() => StockModel)
export class QueryStockResolver {
  constructor(
    private stockService: StockService,
    private productService: ProductService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => QueryStock)
  async QueryStock(
    @CurrentUser() merchant: AuthUser,
    @Args('filter', { nullable: true }) filter?: QueryStockInput,
    @Args('pagination', {
      nullable: true,
      defaultValue: {
        page: 1,
        perPage: 10,
      },
    })
    pagination?: PaginationInput,
  ) {
    if (filter.type === 'entry') {
      const [stockData, countStockEntry] = await this.stockService.getEntry(
        merchant.id,
        filter,
        {
          skip: pagination.page,
          take: pagination.perPage,
        },
      );

      const newStock = stockData.map((item) => ({
        ...item,
        type: 'entry',
        createdAt: item.createdAt,
      }));

      const lastPage = Math.ceil(countStockEntry / pagination.perPage);
      const nextPage = pagination.page < lastPage ? pagination.page + 1 : null;
      const prevPage = pagination.page > 1 ? pagination.page - 1 : null;

      return {
        first: 1,
        next: nextPage,
        prev: prevPage,
        last: lastPage,
        page: pagination.page,
        perPage: pagination.perPage,
        totalOfItem: countStockEntry,
        data: newStock,
      };
    }

    if (filter.type === 'output') {
      const [stockData, countStockOutput] = await this.stockService.getOutput(
        merchant.id,
        filter,
        {
          skip: pagination.page,
          take: pagination.perPage,
        },
      );

      const newStock = stockData.map((item) => ({
        ...item,
        createdAt: item.releaseDate,
        type: 'output',
      }));

      const lastPage = Math.ceil(countStockOutput / pagination.perPage);
      const nextPage = pagination.page < lastPage ? pagination.page + 1 : null;
      const prevPage = pagination.page > 1 ? pagination.page - 1 : null;

      return {
        first: 1,
        next: nextPage,
        prev: prevPage,
        last: lastPage,
        page: pagination.page,
        perPage: pagination.perPage,
        totalOfItem: countStockOutput,
        data: newStock,
      };
    }

    const stockData = await Promise.all([
      await this.stockService.getEntry(merchant.id, filter, {
        skip: pagination.page,
        take: pagination.perPage,
      }),
      await this.stockService.getOutput(merchant.id, filter, {
        skip: pagination.page,
        take: pagination.perPage,
      }),
    ]);

    const combinedStockData = [
      ...stockData[0][0].map((item) => ({
        ...item,
        createdAt: item.createdAt,
        type: 'entry',
      })),
      ...stockData[1][0].map((item) => ({
        ...item,
        createdAt: item.releaseDate,
        type: 'output',
      })),
    ];

    const totalItems = stockData[0][1] + stockData[1][1];
    const lastPage = Math.ceil(totalItems / pagination.perPage);
    const nextPage = pagination.page < lastPage ? pagination.page + 1 : null;
    const prevPage = pagination.page > 1 ? pagination.page - 1 : null;

    combinedStockData.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return {
      first: 1,
      next: nextPage,
      prev: prevPage,
      last: lastPage,
      page: pagination.page,
      perPage: pagination.perPage,
      totalOfItem: totalItems,
      data: combinedStockData,
    };
  }

  @ResolveField(() => Product)
  async product(@Parent() stock: StockModel) {
    return await this.productService.findById(stock.productId);
  }
}
