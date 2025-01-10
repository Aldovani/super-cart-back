import { Resolver, Query } from '@nestjs/graphql';
import { MerchantService } from 'src/services/merchant.service';
import { Merchant } from '../../models/merchant.model';

@Resolver(() => Merchant)
export class QueryMerchantResolver {
  constructor(private merchantService: MerchantService) {}

  @Query(() => [Merchant!]!)
  async queryMerchants() {
    return await this.merchantService.list();
  }
}
