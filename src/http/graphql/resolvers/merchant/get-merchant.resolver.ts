import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Merchant } from '../../models/merchant.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/http/auth/jwt-auth.guard';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { AddressService } from 'src/services/address.service';
import { ContactService } from 'src/services/contact.service';
import { Contact } from '../../models/contact.model';
import { Address } from '../../models/address.model';
import { ProductService } from 'src/services/product.service';
import { Product } from '../../models/product.model';

@Resolver(() => Merchant)
export class GetMerchantResolver {
  constructor(
    private addressService: AddressService,
    private contactService: ContactService,
    private productService: ProductService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Merchant)
  async me(@CurrentUser() merchant: AuthUser) {
    return merchant;
  }

  @ResolveField(() => Address, { nullable: true })
  async address(@Parent() merchant: Merchant) {
    return await this.addressService.findByMerchantID(merchant.id);
  }

  @ResolveField(() => [Contact])
  async contact(@Parent() merchant: Merchant) {
    return await this.contactService.findManyByMerchantID(merchant.id);
  }

  @ResolveField(() => [Product])
  async products(@Parent() merchant: Merchant) {
    return await this.productService.findManyByMerchantId(merchant.id);
  }
}
