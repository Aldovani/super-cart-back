import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { MerchantService } from 'src/services/merchant.service';
import { hash } from 'bcrypt';
import { Merchant } from '../../models/merchant.model';
import { CreateMerchantInput } from '../../inputs/merchant/create-merchant-input';

@Resolver(() => Merchant)
export class CreateMerchantResolver {
  constructor(private merchantService: MerchantService) {}

  @Mutation(() => Merchant)
  async createMerchant(@Args('data') data: CreateMerchantInput) {
    const merchantWitheSameCNPJ = await this.merchantService.findByCNPJ(
      data.cnpj,
    );

    if (merchantWitheSameCNPJ) {
      throw new Error('Merchant with this cnpj already exists');
    }

    const merchantWitheSameEmail = await this.merchantService.findByEmail(
      data.email,
    );

    if (merchantWitheSameEmail) {
      throw new Error('Merchant with this email already exists');
    }

    const passwordHashed = await hash(data.password, 8);

    const merchant = await this.merchantService.create({
      ...data,
      password: passwordHashed,
    });

    return merchant;
  }
}
