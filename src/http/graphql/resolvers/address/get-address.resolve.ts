import { Query, Resolver } from '@nestjs/graphql';
import { AddressService } from 'src/services/address.service';
import { Address } from '../../models/address.model';
import { GqlAuthGuard } from 'src/http/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';

@Resolver(() => Address)
export class GetAddressResolver {
  constructor(private addressService: AddressService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Address)
  async getAddress(@CurrentUser() user: AuthUser) {
    const address = await this.addressService.findByMerchantID(user.id);

    return address;
  }
}
