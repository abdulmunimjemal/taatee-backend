import { Controller, UseGuards, Param, Get, Req, Delete, ForbiddenException } from '@nestjs/common';
import { BookingService } from './booking.service';
import { JwtGuard, RoleGuard } from '../auth/guard';
import { Role } from '../auth/role';
import { Roles } from '../auth/decorator';
import { Booking } from './entities';

@Controller('booking')
export class BookingController {
    constructor(
        private readonly bookingService: BookingService,
    ) {}

    @Get()
    @UseGuards(JwtGuard, RoleGuard)
    @Roles(Role.Admin)
    getAllBookings(): Promise<Booking[]> {
    return this.bookingService.getAllBookings();
    }

    @Get(":id")
    @UseGuards(JwtGuard)
    async getBookingById(
        @Param('id') id: number,
        @Req() request,
    ) {
        const booking = await this.bookingService.getBookingById(id);
        const user = request.user
        if (!(user.role === Role.Admin || booking.user.id == user.id)) throw new ForbiddenException("You are not allowed to access this record!");
        return booking;
    } 

    @Delete(':id')
    @UseGuards(JwtGuard, RoleGuard)
    async deleteBooking(@Param('id') bookingId: number, @Req() request) {
        const user = request.user
        return this.bookingService.deleteBooking(bookingId, user);
    }
}