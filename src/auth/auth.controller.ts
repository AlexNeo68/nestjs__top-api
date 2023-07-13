import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from 'src/auth/dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly configService: ConfigService) {}
  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.configService.get('TEST');
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {}
}
