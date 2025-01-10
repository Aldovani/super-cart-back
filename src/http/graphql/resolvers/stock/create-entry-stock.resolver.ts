import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { StockEntryService } from 'src/services/stock-entry.service';
import { CreateStockEntryInput } from '../../inputs/stock/create-stock-entry-input';
import { HttpException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/http/auth/jwt-auth.guard';
import { ProductService } from 'src/services/product.service';
import { StockModel } from '../../models/stock.model';

@Resolver(() => StockModel)
export class CreateEntryStockResolver {
  constructor(
    private stockEntryService: StockEntryService,
    private productService: ProductService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => StockModel)
  async createEntryStock(
    @Args('data') data: CreateStockEntryInput,
    @CurrentUser() user: AuthUser,
  ) {
    const productExists = await this.productService.findById(data.productId);

    if (!productExists) {
      throw new HttpException('Product not found', 404);
    }

    const stockyEntry = await this.stockEntryService.create({
      ...data,
      merchantId: user.id,
    });

    return stockyEntry;
  }
}
