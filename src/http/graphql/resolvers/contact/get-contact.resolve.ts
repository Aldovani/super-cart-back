import { Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/http/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { Contact } from '../../models/contact.model';
import { ContactService } from 'src/services/contact.service';

@Resolver(() => Contact)
export class GetContactResolver {
  constructor(private contactService: ContactService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Contact])
  async getContact(@CurrentUser() user: AuthUser) {
    const contacts = await this.contactService.findManyByMerchantID(user.id);

    return contacts;
  }
}
