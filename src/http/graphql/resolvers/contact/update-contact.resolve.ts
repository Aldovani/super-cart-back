import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/http/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { ContactService } from 'src/services/contact.service';
import { Contact } from '../../models/contact.model';
import { ContactsList } from '../../entities/contacts-list';

@Resolver(() => Contact)
export class UpdateContactResolver {
  constructor(private contactService: ContactService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => [Contact])
  async updateContact(
    @Args('phoneNumbers', { type: () => [String] })
    data: string[],
    @CurrentUser() user: AuthUser,
  ) {
    const contacts = await this.contactService.findManyByMerchantID(user.id);

    const contactsList = new ContactsList(contacts);

    contactsList.update(
      data.map((phoneNumber, index) => ({
        phoneNumber,
        id: index,
        merchantId: user.id,
      })),
    );

    await this.contactService.create(
      contactsList.getNewItems().map((item) => ({
        merchantId: user.id,
        phoneNumber: item.phoneNumber,
      })),
    );
    await this.contactService.delete(
      contactsList.getRemovedItems().map((item) => item.id),
    );

    const newContacts = await this.contactService.findManyByMerchantID(user.id);

    return newContacts;
  }
}
