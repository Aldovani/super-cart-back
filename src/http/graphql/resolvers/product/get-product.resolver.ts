import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Product } from '../../models/product.model';
import { ProductService } from 'src/services/product.service';
import { Category } from '../../models/category.model';
import { CategoryService } from 'src/services/category.service';

@Resolver(() => Product)
export class GetProductResolver {
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
  ) {}

  @Query(() => Product)
  async getProduct(@Args('productId') productId: string) {
    const products = await this.productService.findById(productId);
    return products;
  }

  @ResolveField(() => [Category], { nullable: true })
  async categories(@Parent() product: Product) {
    return await this.categoryService.findByProductID(product.id);
  }
}
