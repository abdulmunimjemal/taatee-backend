import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BookingModule } from '../booking/booking.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    BookingModule
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
