import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { QueryStockResolver } from './query-stock.resolver';
import { CreateEntryStockResolver } from './create-entry-stock.resolver';
import { CreateOutputStockResolver } from './create-output-stock.resolver';
import { StockEntryService } from 'src/services/stock-entry.service';
import { StockOutputService } from 'src/services/stock-output.service';
import { StockService } from 'src/services/stock.service';
import { ProductService } from 'src/services/product.service';

@Module({
  imports: [DatabaseModule],
  exports: [],
  providers: [
    StockEntryService,
    StockOutputService,
    ProductService,
    StockService,
    QueryStockResolver,
    CreateEntryStockResolver,
    CreateOutputStockResolver,
  ],
})
export class StockModule {}
