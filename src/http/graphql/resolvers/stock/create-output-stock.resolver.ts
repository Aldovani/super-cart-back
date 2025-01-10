import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { HttpException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/http/auth/jwt-auth.guard';
import { ProductService } from 'src/services/product.service';
import { StockOutputService } from 'src/services/stock-output.service';
import { CreateStockOutputInput } from '../../inputs/stock/create-stock-output-input';
import { StockModel } from '../../models/stock.model';

@Resolver(() => StockModel)
export class CreateOutputStockResolver {
  constructor(
    private stockOutputService: StockOutputService,
    private productService: ProductService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => StockModel)
  async createOutputStock(
    @Args('data') data: CreateStockOutputInput,
    @CurrentUser() merchant: AuthUser,
  ) {
    const productExists = await this.productService.findById(data.productId);

    if (!productExists) {
      throw new HttpException('Product not found', 404);
    }

    if (productExists.merchantId !== merchant.id) {
      throw new HttpException('Unauthorized', 401);
    }

    const stockyOutput = await this.stockOutputService.create({
      ...data,
      merchantId: merchant.id,
    });

    return {
      ...stockyOutput,
      type: 'output',
      createdAt: stockyOutput.releaseDate,
    };
  }
}
