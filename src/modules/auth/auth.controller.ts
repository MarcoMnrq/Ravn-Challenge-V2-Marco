import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { ExposedEndpoint } from '../../decorators/exposed-endpoint.decorator';
import { SignInEmailDto } from './dto/sign-in-email.dto';

@ApiTags('Authentication & Authorization')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login-email')
  @ExposedEndpoint()
  async loginEmail(@Body() signInEmailDto: SignInEmailDto) {
    return this.authService.signInWithEmail(signInEmailDto);
  }

  @Post('register')
  @ExposedEndpoint()
  async register(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
