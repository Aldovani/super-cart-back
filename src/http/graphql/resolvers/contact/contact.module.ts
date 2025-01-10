import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { ContactService } from 'src/services/contact.service';
import {UpdateContactResolver  } from './update-contact.resolve';
import { GetContactResolver } from './get-contact.resolve';

@Module({
  imports: [DatabaseModule],
  controllers: [],

  providers: [
    ContactService,
    UpdateContactResolver,
    GetContactResolver,
  ],
})
export class ContactModule {}
