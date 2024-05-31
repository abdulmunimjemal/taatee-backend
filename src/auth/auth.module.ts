import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { jwtConfig } from './jwt';
import { JwtStrategy } from './jwt';
import { JwtModule } from '@nestjs/jwt';
import { RoleGuard } from './guard';

@Module({
  imports: [ TypeOrmModule.forFeature([User]),
    UserModule,
    JwtModule.register(jwtConfig)
  ],
  providers: [AuthService, JwtStrategy, RoleGuard],
  controllers: [AuthController]
})
export class AuthModule {}
