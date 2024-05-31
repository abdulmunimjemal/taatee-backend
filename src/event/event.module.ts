import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities';
import { BookingModule } from '../booking/booking.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    BookingModule
  ],
  providers: [EventService],
  controllers: [EventController],
  exports: [EventService]
})
export class EventModule {}
