import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Product } from '../../models/product.model';
import { ProductService } from 'src/services/product.service';
import { GqlAuthGuard } from 'src/http/auth/jwt-auth.guard';
import { HttpException, UseGuards } from '@nestjs/common';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { LocalStorageProvider } from 'src/shared/providers/storage/local-storage-provider';
import { UpdateProductInput } from '../../inputs/product/update-product-input';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { CategoryService } from 'src/services/category.service';
import { CategoriesList } from '../../entities/categories-list';

@Resolver(() => Product)
export class UpdateProductResolver {
  constructor(
    private productService: ProductService,
    private storageProvider: LocalStorageProvider,
    private categoryService: CategoryService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Product)
  async updateProduct(
    @Args('data', { nullable: true }) data: UpdateProductInput,
    @Args('image', { type: () => GraphQLUpload, nullable: true })
    image: FileUpload,
    @CurrentUser() user: AuthUser,
  ) {


    const product = await this.productService.findById(data.productId);

    if (!product) {
      return new HttpException('Resource not found', 404);
    }

    if (user.id !== product.merchantId) {
      return new HttpException('Not permission', 403);
    }

    const productCategories = await this.categoryService.findByProductID(
      product.id,
    );

    const categoriesList = new CategoriesList(
      productCategories.map((e) => e.id),
    );

    if (data.categories) {
      categoriesList.update(data.categories);
    }

    let fileName: string | null;
    if (image) {
      await this.storageProvider.delete(product.imgUrl);
      fileName = await this.storageProvider.save(image);
    }

    try {
      const product = await this.productService.update({
        ...data,
        id: data.productId,
        imgUrl: fileName ? fileName : undefined,
        addCategories: categoriesList.getNewItems(),
        deleteCategories: categoriesList.getRemovedItems(),
      });

      return product;
    } catch (err) {
      return new HttpException("couldn't save something", 400);
    }
  }
}
