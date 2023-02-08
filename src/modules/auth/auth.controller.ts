import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication & Authorization')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {}
