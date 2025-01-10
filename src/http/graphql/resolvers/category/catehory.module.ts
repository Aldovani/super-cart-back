import { Module } from '@nestjs/common';
import { CategoryService } from 'src/services/category.service';
import { GetCategoryResolver } from './get-category.resolver';
import { CreteCategoryResolver } from './create-category.resolver';
import { DeleteCategoryResolver } from './delete-category.resolver';
import { UpdateCategoryResolver } from './update-category.resolver';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  exports: [],
  providers: [
    CategoryService,
    GetCategoryResolver,
    CreteCategoryResolver,
    DeleteCategoryResolver,
    UpdateCategoryResolver,
  ],
})
export class CategoryModule {}
