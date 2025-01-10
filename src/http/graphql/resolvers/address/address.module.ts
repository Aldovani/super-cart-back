import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { AddressService } from 'src/services/address.service';
import { CreateOrUpdateAddressResolver } from './create-or-update-address.resolve';
import { GetAddressResolver } from './get-address.resolve';

@Module({
  imports: [DatabaseModule],
  controllers: [],

  providers: [
    AddressService,
    CreateOrUpdateAddressResolver,
    GetAddressResolver,
  ],
})
export class AddressModule {}
