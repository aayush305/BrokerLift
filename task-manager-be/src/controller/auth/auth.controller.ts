import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from 'src/service/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body('answer') answer: string) {
    return this.authService.authenticate(answer);
  }
}
