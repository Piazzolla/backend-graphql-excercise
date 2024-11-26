import { Query, Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { SignupInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.type';
import { LoginInput } from './dto/inputs/login.input';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';



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

  @Query( () => AuthResponse , { name: 'revalidate'})
  @UseGuards( JwtAuthGuard )
  revalidateToken( @CurrentUser() user: User): AuthResponse {
    
    throw new Error('not implemented yet')
    //return  this.authService.revalidateToken( )
  }
}
