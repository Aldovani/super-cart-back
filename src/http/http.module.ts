import { Module } from '@nestjs/common';

import { MerchantService } from 'src/services/merchant.service';
import { DatabaseModule } from 'src/database/database.module';
import { MerchantModule } from './graphql/resolvers/merchant/merchant.module';
import { AddressModule } from './graphql/resolvers/address/address.module';
import { AddressService } from 'src/services/address.service';
import { ContactService } from 'src/services/contact.service';
import { ContactModule } from './graphql/resolvers/contact/contact.module';
import { CategoryService } from 'src/services/category.service';
import { CategoryModule } from './graphql/resolvers/category/catehory.module';
import { ProductModule } from './graphql/resolvers/product/product.module';
import { ProductService } from 'src/services/product.service';
import { PaymentMethodsService } from 'src/services/payment-method.service';
import { PaymentMethodsModel } from './graphql/resolvers/payment-methods/payment-methods.service';
import { StockOutputService } from 'src/services/stock-output.service';
import { StockEntryService } from 'src/services/stock-entry.service';
import { StockService } from 'src/services/stock.service';
import { StockModule } from './graphql/resolvers/stock/stock.module';

@Module({
  imports: [
    DatabaseModule,
    MerchantModule,
    AddressModule,
    ContactModule,
    CategoryModule,
    ProductModule,
    StockModule,
    PaymentMethodsModel,
  ],
  controllers: [],
  providers: [
    MerchantService,
    AddressService,
    ContactService,
    CategoryService,
    ProductService,
    StockOutputService,
    StockEntryService,
    StockService,
    PaymentMethodsService,
  ],
})
export class HttpModule {}
