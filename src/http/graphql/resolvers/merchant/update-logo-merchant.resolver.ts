import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MerchantService } from 'src/services/merchant.service';
import { GqlAuthGuard } from 'src/http/auth/jwt-auth.guard';
import { HttpException, UseGuards } from '@nestjs/common';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { LocalStorageProvider } from 'src/shared/providers/storage/local-storage-provider';
import { Merchant } from '../../models/merchant.model';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';

@Resolver(() => Merchant)
export class UpdateLogoMerchantResolver {
  constructor(
    private merchantService: MerchantService,
    private storageProvider: LocalStorageProvider,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async updateLogoMerchant(
    @Args('image', { type: () => GraphQLUpload })
    image: FileUpload,
    @CurrentUser() user: AuthUser,
  ) {
    const logoUrlAlreadyExist = user.logoUrl;

    if (logoUrlAlreadyExist) {
      await this.storageProvider.delete(logoUrlAlreadyExist);
    }

    try {
      const fileName = await this.storageProvider.save(image);

      await this.merchantService.update(user.id, {
        logoUrl: fileName,
      });

      return `${process.env.UPLOADS_URL}${fileName}`;
    } catch (err) {
      return new HttpException("couldn't save the file", 400);
    }
  }
}
