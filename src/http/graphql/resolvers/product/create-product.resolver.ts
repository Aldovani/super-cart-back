import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Product, ProductStatus } from '../../models/product.model';
import { CreateProductInput } from '../../inputs/product/create-product-input';
import { ProductService } from 'src/services/product.service';
import { GqlAuthGuard } from 'src/http/auth/jwt-auth.guard';
import { HttpException, UseGuards } from '@nestjs/common';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { LocalStorageProvider } from 'src/shared/providers/storage/local-storage-provider';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';

@Resolver(() => Product)
export class CreateProductResolver {
  constructor(
    private productService: ProductService,
    private storageProvider: LocalStorageProvider,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Product)
  async createProduct(
    @Args('data') data: CreateProductInput,
    @Args('image', { type: () => GraphQLUpload })
    image: FileUpload,
    @CurrentUser()
    merchant: AuthUser,
  ) {
    try {
      const fileName = await this.storageProvider.save(image);

      const product = await this.productService.create({
        ...data,
        imgUrl: fileName,
        merchantId: merchant.id,
        categories: data.categories.map((category) => ({
          categoryId: category,
        })),
      });

      return product;
    } catch (err) {
      console.log(err);

      return new HttpException("couldn't save something", 400);
    }
  }
}
