import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { SignInput } from '../graphql/inputs/merchant/sign-input';
import { AuthService } from './auth.service';
import { Auth } from './dto/model';
import { Response } from 'express';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Auth)
  async Auth(@Args('data') data: SignInput, @Context('res') res: Response) {
    const { merchant, token } = await this.authService.validateUser({
      cnpj: data.cnpj,
      password: data.password,
    });

    res.cookie('super_cart_token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      signed: false,
      domain: 'localhost',
      path: '/',
    });

    return {
      token,
      merchant,
    };
  }

  @Mutation(() => Boolean)
  async SignOut(@Context('res') res: Response) {
    res.clearCookie('super_cart_token');

    return true;
  }
}
