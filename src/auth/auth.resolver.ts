import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Query } from '@nestjs/common';
import { SignupInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.type';
import { LoginInput } from './dto/inputs/login.input';



/*
  This is for learning only.
  In real use cases the auth should not be in the graphql endpoint, it should be in a different rest api
  for security reasons.

*/
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {
  }

  @Mutation( () => AuthResponse , { name: 'signup'})
  async signup(
    @Args('signupInput') signupInput: SignupInput
  ): Promise<AuthResponse> {
    return this.authService.signup(signupInput)
  }

  @Mutation( () => AuthResponse , { name: 'login'})
  async login(
    @Args('logininput') loginInput: LoginInput
  ): Promise<AuthResponse> {
    return this.authService.login(loginInput)
  }

  // @Query( /* */ , { name: 'revalidate'})
  // async revalidateToken() {
  //   return  this.authService.revalidateToken(/*  */)
  // }
}
