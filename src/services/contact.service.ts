import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

type Contact = {
  phoneNumber: string;
  merchantId: string;
};
type UpdateContactProps = { id: number } & Contact;
type CreateContactProps = Contact[];

type findByContactIdAndMerchantIdProps = {
  merchantId: string;
  contactId: number;
};

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateContactProps) {
    return this.prisma.contact.createMany({
      data,
    });
  }

  update(data: UpdateContactProps) {
    return this.prisma.contact.update({
      data,
      where: {
        id: data.id,
      },
    });
  }

  delete(contactId: number[]) {
    return this.prisma.contact.deleteMany({
      where: {
        id: {
          in: contactId,
        },
      },
    });
  }

  findManyByMerchantID(merchantId: string) {
    return this.prisma.contact.findMany({
      where: {
        merchantId,
      },
    });
  }

  findByContactIdAndMerchantId({
    contactId,
    merchantId,
  }: findByContactIdAndMerchantIdProps) {
    return this.prisma.contact.findFirst({
      where: {
        merchantId,
        id: contactId,
      },
    });
  }
}
