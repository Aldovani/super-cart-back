import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { MerchantService } from 'src/services/merchant.service';

type validateUserProps = {
  cnpj: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(
    private merchantService: MerchantService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ cnpj, password }: validateUserProps) {
    const merchantExists = await this.merchantService.findByCNPJ(cnpj);

    if (!merchantExists) {
      throw new UnauthorizedException();
    }

    const isPasswordCorrectly = await compare(
      password,
      merchantExists.password,
    );

    if (!isPasswordCorrectly) {
      throw new UnauthorizedException();
    }

    const token = this.jwtToken(merchantExists.id);

    return {
      token,
      merchant: merchantExists,
    };
  }

  jwtToken(sub: string) {
    const token = this.jwtService.sign({ merchantId: sub });

    return token;
  }
}
