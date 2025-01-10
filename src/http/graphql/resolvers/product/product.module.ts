import { Module } from '@nestjs/common';
import { ProductService } from 'src/services/product.service';
import { LocalStorageProvider } from 'src/shared/providers/storage/local-storage-provider';
import { CreateProductResolver } from './create-product.resolver';
import { UpdateProductResolver } from './update-product.resolver';
import { DeleteProductResolver } from './delete-product.resolver';
import { GetProductResolver } from './get-product.resolver';
import { DatabaseModule } from 'src/database/database.module';
import { CategoryService } from 'src/services/category.service';
import { QueryProductsResolver } from './query-products.resolver';
import { GetMinMaxPriceProductResolver } from './get-min-max-price-product.resolver';

@Module({
  imports: [DatabaseModule],
  exports: [],
  providers: [
    LocalStorageProvider,
    ProductService,
    CategoryService,
    CreateProductResolver,
    UpdateProductResolver,
    DeleteProductResolver,
    GetProductResolver,
    QueryProductsResolver,
    GetMinMaxPriceProductResolver
  ],
})
export class ProductModule {}
