import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AddressService } from 'src/services/address.service';
import { Address } from '../../models/address.model';
import { CreateOrUpdateAddressInput } from '../../inputs/address/create-or-update-address-input';
import { GqlAuthGuard } from 'src/http/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';

@Resolver(() => Address)
export class CreateOrUpdateAddressResolver {
  constructor(private addressService: AddressService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Address)
  async createOrUpdateAddress(
    @Args('data') data: CreateOrUpdateAddressInput,
    @CurrentUser() user: AuthUser,
  ) {
    const address = await this.addressService.createOrUpdate({
      ...data,
      merchantId: user.id,
    });

    return address;
  }
}
