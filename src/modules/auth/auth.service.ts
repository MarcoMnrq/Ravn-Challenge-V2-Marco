import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInEmailDto } from './dto/sign-in-email.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signInWithEmail(signInEmailDto: SignInEmailDto) {
    const user = await this.usersService.findOneByEmail(signInEmailDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isValidPassword = await argon2.verify(
      user.password,
      signInEmailDto.password,
    );
    /*
		if (user.verified === false) {
			throw new UnauthorizedException('Please verify your email');
		}
    */
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const accessToken = this.jwtService.sign({
      email: user.email,
      role: user.role,
      sub: user.id,
    });
    return {
      authenticatedUser: user,
      accessToken: accessToken,
    };
  }

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const existingUser = await this.usersService.findOneByEmail(
      signUpDto.email,
    );
    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }
    return this.usersService.create({ ...signUpDto });
  }
}
