import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JWT_SECRETE } from 'src/constants';
import { MerchantService } from 'src/services/merchant.service';
import { Request } from 'express';

type ValidateProps = {
  merchantId: string;
  iat: number;
};

const cookieExtractor = function (req: Request) {
  var token: string = '';

  if ((req && req.cookies) || req.headers.cookie) {
    const tokenCookie =
      req.cookies['super_cart_token'] ||
      (JSON.parse(req.headers.cookie || '[]') as string[])[1];

    token = tokenCookie || '';
  }

  return token;
};
const headerExtractor = function (req: Request) {
  let token: string = '';

  if (req && req.headers['authorization']) {
    token = req.headers['authorization']?.split(' ')[1];
  }

  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private merchantService: MerchantService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        headerExtractor,
        cookieExtractor,
      ]),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRETE,
    });
  }

  async validate(merchantId: ValidateProps) {
    const merchantExist = await this.merchantService.findByID(
      merchantId.merchantId,
    );

    if (!merchantExist) {
      throw new UnauthorizedException();
    }

    return merchantExist;
  }
}
