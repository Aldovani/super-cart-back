import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AnonymousStrategy } from './anonymous.strategy';
import { MerchantService } from 'src/services/merchant.service';
import { AuthResolver } from './auth.resolver';
import { DatabaseModule } from 'src/database/database.module';
import { JWT_SECRETE } from 'src/constants';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRETE,
      signOptions: {},
    }),
    DatabaseModule,
  ],

  providers: [
    JwtStrategy,
    AnonymousStrategy,
    MerchantService,
    AuthResolver,
    AuthService,
  ],
})
export class AuthModule {}
