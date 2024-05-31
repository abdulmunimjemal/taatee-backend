import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { EventModule } from './event/event.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './auth/jwt/jwt.config';
import { SeederService } from './seeder/seeder.service';

@Module({
  imports: [AuthModule, UserModule, EventModule, BookingModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-bold-hall-a4mwxvra.us-east-1.pg.koyeb.app',
      port: 5434,
      username: 'koyeb-adm', // update me
      password: 'NAyc6pHSZU2s',
      database: 'koyebdb',
      entities: [__dirname + '/**/entities/*.entity.ts'], // pattern
      autoLoadEntities: true,
      ssl: 'true',
    }),
    JwtModule.register(jwtConfig),
  ],
 providers: [SeederService],
})
export class AppModule {}
