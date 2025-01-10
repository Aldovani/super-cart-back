import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Category } from '../../models/category.model';
import { CategoryService } from 'src/services/category.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/http/auth/jwt-auth.guard';
import { UpdateCategoryInput } from '../../inputs/category/update-category-input';

@Resolver(() => Category)
export class UpdateCategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Category)
  async updateCategory(@Args('data') data: UpdateCategoryInput) {
    const category = await this.categoryService.update(data);
    return category;
  }
}
