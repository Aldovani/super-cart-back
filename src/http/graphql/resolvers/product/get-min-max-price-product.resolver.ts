import { Query, Resolver } from '@nestjs/graphql';
import { MinMaxProduct, Product } from '../../models/product.model';
import { ProductService } from 'src/services/product.service';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { GqlAuthGuard } from 'src/http/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Product)
export class GetMinMaxPriceProductResolver {
  constructor(private productService: ProductService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => MinMaxProduct)
  async getMaxPriceProduct(
    @CurrentUser()
    merchant: AuthUser,
  ) {
    const data = await this.productService.getMinMaxCostProductByMerchantId(
      merchant.id,
    );
    return { min: data._min.costPrice, max: data._max.costPrice };
  }
}
