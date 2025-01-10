import { Contact } from '@prisma/client';
import { WatchedList } from '../../../shared/providers/entities/watched-list';

export class ContactsList extends WatchedList<Contact> {
  compareItems(a: Contact, b: Contact): boolean {
    return a.phoneNumber === b.phoneNumber;
  }
}
