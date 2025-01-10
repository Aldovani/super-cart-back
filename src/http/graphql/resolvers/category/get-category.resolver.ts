import { Query, Resolver } from '@nestjs/graphql';
import { Category } from '../../models/category.model';
import { CategoryService } from 'src/services/category.service';

@Resolver(() => Category)
export class GetCategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => [Category])
  async getCategory() {
    const categories = await this.categoryService.find();
    return categories;
  }
}
