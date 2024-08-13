import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly correctAnswer = process.env.ACCESS_KEY;

  constructor(private readonly jwtService: JwtService) {}

  async authenticate(answer: string): Promise<{ accessToken: string }> {
    if (answer !== this.correctAnswer) {
      throw new UnauthorizedException('Incorrect answer');
    }

    const payload = { answer };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
