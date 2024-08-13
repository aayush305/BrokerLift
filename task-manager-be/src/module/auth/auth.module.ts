import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/controller/auth/auth.controller';
import { AuthService } from 'src/service/auth/auth.service';
import { JwtStrategy } from 'src/utils/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'we_can_do_it',
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
