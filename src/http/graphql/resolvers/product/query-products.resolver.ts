import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Product, QueryProduct } from '../../models/product.model';
import { PaginationProps, ProductService } from 'src/services/product.service';
import { Category } from '../../models/category.model';
import { CategoryService } from 'src/services/category.service';
import { FilterProductInput } from '../../inputs/product/filter-product-input';
import { GqlAuthGuard } from 'src/http/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { PaginationInput } from '../../inputs/utils/pagination-input';

@Resolver(() => Product)
export class QueryProductsResolver {
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => QueryProduct)
  async queryProducts(
    @CurrentUser() user: AuthUser,
    @Args('filter', {
      type: () => FilterProductInput,
      nullable: true,
    })
    filter?: FilterProductInput,
    @Args('merchantId', { nullable: true })
    merchantId?: string,

    @Args('pagination', {
      nullable: true,
      defaultValue: {
        page: 1,
        perPage: 10,
      },
    })
    pagination?: PaginationInput,
  ) {
    const merchant = merchantId || user?.id;

    const [products, countProduct] =
      await this.productService.findManyByMerchantId(merchant, filter, {
        skip: pagination.page,
        take: pagination.perPage,
      });

    const lastPage = Math.ceil(countProduct / pagination.perPage);
    const nextPage = pagination.page < lastPage ? pagination.page + 1 : null;
    const prevPage = pagination.page > 1 ? pagination.page - 1 : null;

    return {
      first: 1,
      next: nextPage,
      prev: prevPage,
      last: lastPage,
      page: pagination.page,
      perPage: pagination.perPage,
      totalOfItem: countProduct,
      data: products,
    };
  }

  @ResolveField(() => [Category], { nullable: true })
  async categories(@Parent() product: Product) {
    return await this.categoryService.findByProductID(product.id);
  }
}
