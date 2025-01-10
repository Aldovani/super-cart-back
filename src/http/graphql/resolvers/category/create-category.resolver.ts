import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Category } from '../../models/category.model';
import { CategoryService } from 'src/services/category.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/http/auth/jwt-auth.guard';
import { CreateCategoryInput } from '../../inputs/category/create-category-input';

@Resolver(() => Category)
export class CreteCategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Category)
  async createCategory(@Args('data') data: CreateCategoryInput) {
    const category = await this.categoryService.create(data);
    return category;
  }
}
