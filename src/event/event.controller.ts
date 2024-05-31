import { Controller, Get, Param, Post, Body, Delete, UseGuards, Patch, Req } from '@nestjs/common';
import { EventService } from './event.service';
import { JwtGuard } from '../auth/guard/';
import { Roles } from '../auth/decorator/';
import { Role } from '../auth/role/';
import { RoleGuard } from '../auth/guard';
import { EventDto, UpdateEventDto } from './dto';
import { BookingService } from '../booking/booking.service';

@Controller('event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly bookingService: BookingService,

    ) {}

  @Get()
  getAllEvents() {
    return this.eventService.getAllEvents();
  }

  @Get(':id')
  async getEventById(@Param('id') id: number){
    return this.eventService.getEventById(id);
  }

  @Post(':id/book')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.User)
  async bookEvent(@Param('id') eventId: number, @Req() request) {
    const user = request.user
    const event = await this.eventService.getEventById(eventId, true)
    return this.bookingService.createBooking(event, user)
  }

  @Get(':id/booking')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.Admin)
  async getBookings(@Param('id') eventId: number) {
    const event = await this.eventService.getEventById(eventId)
    return this.bookingService.getAllBookingsForEvent(event)
  }

  @Post()
  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.Admin)
  async createEvent(@Body() eventDto: EventDto) {
    return this.eventService.createEvent(eventDto);
  }

  @Patch(':id')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.Admin)
  updateEvent(@Param('id') id: number, @Body() updatedEvent: UpdateEventDto) {
    return this.eventService.updateEvent(id, updatedEvent);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role.Admin)
  deleteEvent(@Param('id') id: number): void {
    this.eventService.deleteEvent(id);
  }
}
