import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInEmailDto } from './dto/sign-in-email.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async loginWithEmail(signInEmailDto: SignInEmailDto) {
    const user = await this.usersService.findOneByEmail(signInEmailDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    /*
    const isValidPassword = await bcrypt.compare(
      signInEmailDto.password,
      user.password,
    );
		if (user.verified === false) {
			throw new UnauthorizedException('Please verify your email');
		}
		
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    */
    return user;
  }
}
