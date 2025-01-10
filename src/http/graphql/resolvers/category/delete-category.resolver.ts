import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Category } from '../../models/category.model';
import { CategoryService } from 'src/services/category.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/http/auth/jwt-auth.guard';
import { DeleteCategoryInput } from '../../inputs/category/delete-category-input';

@Resolver(() => Category)
export class DeleteCategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteCategory(@Args('data') data: DeleteCategoryInput) {
    await this.categoryService.delete(data.categoryId);
    return true;
  }
}
