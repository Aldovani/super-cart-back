import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Product } from '../../models/product.model';
import { ProductService } from 'src/services/product.service';
import { GqlAuthGuard } from 'src/http/auth/jwt-auth.guard';
import { HttpException, UseGuards } from '@nestjs/common';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { LocalStorageProvider } from 'src/shared/providers/storage/local-storage-provider';
import { DeleteProductInput } from '../../inputs/product/delete-product-input';

@Resolver(() => Product)
export class DeleteProductResolver {
  constructor(
    private productService: ProductService,
    private storageProvider: LocalStorageProvider,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteProduct(
    @Args('data') data: DeleteProductInput,
    @CurrentUser() user: AuthUser,
  ) {
    const product = await this.productService.findById(data.productId);
    if (product.merchantId !== user.id) {
      return new HttpException('Not permission', 403);
    }

    try {
      await this.storageProvider.delete(product.imgUrl);
      await this.productService.delete(product.id);

      return true;
    } catch (err) {
      return new HttpException("couldn't save something", 400);
    }
  }
}
