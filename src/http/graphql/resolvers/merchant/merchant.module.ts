import { Module } from '@nestjs/common';

import { MerchantService } from 'src/services/merchant.service';
import { DatabaseModule } from 'src/database/database.module';
import { CreateMerchantResolver } from './create-merchant.resolver';
import { UpdateMerchantResolver } from './update-merchant.resolver';
import { QueryMerchantResolver } from './query-merchant.resolver';
import { GetMerchantResolver } from './get-merchant.resolver';
import { DeleteMerchantResolver } from './delete-merchant.resolver';
import { UpdateBannerMerchantResolver } from './update-banner-merchant.resolver';
import { LocalStorageProvider } from 'src/shared/providers/storage/local-storage-provider';
import { UpdateLogoMerchantResolver } from './update-logo-merchant.resolver';
import { AddressService } from 'src/services/address.service';
import { ContactService } from 'src/services/contact.service';
import { ProductService } from 'src/services/product.service';
import { ChangePasswordMerchantResolver } from './change-password-merchant.resolver';
import { VerifyCNPJMerchantResolver } from './verify-cnpj-merchant.resolver';
import { VerifyEmailMerchantResolver } from './verify-email-merchant.resolver';

@Module({
  imports: [DatabaseModule],
  controllers: [],

  providers: [
    LocalStorageProvider,
    MerchantService,
    AddressService,
    ContactService,
    ProductService,
    CreateMerchantResolver,
    QueryMerchantResolver,
    UpdateMerchantResolver,
    UpdateBannerMerchantResolver,
    UpdateLogoMerchantResolver,
    GetMerchantResolver,
    DeleteMerchantResolver,
    ChangePasswordMerchantResolver,
    VerifyCNPJMerchantResolver,
    VerifyEmailMerchantResolver,
  ],
})
export class MerchantModule {}
