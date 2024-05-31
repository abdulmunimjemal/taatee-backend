import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities';
import { Repository } from 'typeorm';
import { User } from '../user/entities';
import { Event } from '../event/entities';
import { Role } from '../auth/role';

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,
    ) {}

    async createBooking(event: Event, user: User): Promise<Booking> {

        if (!event) {
            throw new NotFoundException(`Event with ID #${event.id} not found`);
        }
        if (event.isCanceled) {
            throw new BadRequestException("Event is canceled. Bookings are not allowed!");
        }
        if (event.maxBooking !== null && event.maxBooking <= event.bookings.length) {
            throw new BadRequestException("Event is fully booked!");
        } 
        if (!user) {
            throw new NotFoundException(`User not found`);
        }
        const existingBooking = await this.bookingRepository.findOne({
            where: { event: event, user: user }
        })

        if (existingBooking) {
            throw new BadRequestException("Booking already exists")
        }

        const newBooking = this.bookingRepository.create({
            event: event,
            user: user,
            bookingDate: new Date()
        });

        return this.bookingRepository.save(newBooking);
    }

    async getBookingById(id: number): Promise<Booking> {
        const booking = await this.bookingRepository.findOne(
            { where: { id: id }, relations: ["event", "user"] },
            );

        if (!booking) {
            throw new NotFoundException(`Booking with ID #${id} not found`);
        }
        delete booking.user.password
        delete booking.user.role
        delete booking.event.maxBooking
        return booking;
    }

    async getAllBookings(): Promise<Booking[]> {
        return this.bookingRepository.find();
      }
    
    async getAllBookingsForUser(user: User): Promise<Booking[]> {
    
        if (!user) {
          throw new NotFoundException(`User not found.`);
        }
        
        return this.bookingRepository.find({ 
            where: {
                user: user,
            },
            relations: ['event']
        });
      }
    
    async getAllBookingsForEvent(event: Event): Promise<Booking[]> {
        if (!event) {
          throw new NotFoundException(`Event not found.`);
        }
    
        const result = this.bookingRepository.find(
            {
                where:
                { event: event },
            relations: ["user"] 
        });

        (await result).forEach(x => {delete x.user.password; delete x.user.role;})
    return result;
    }

    async deleteBooking(bookingId: number, user: User): Promise<any> {
        const booking = await this.bookingRepository.findOne({
            where: { id: bookingId },
            relations: ["event", "user"]
        });

        if (!booking) {
            throw new NotFoundException(`Booking not found`);
        }

        if (!(booking.user.id === user.id || user.role === Role.Admin)) {
            throw new ForbiddenException("You are not allowed to cancel this booking");
        }
        const result = this.bookingRepository.remove(booking);
        if (!result)
            throw new BadRequestException("Failed To delete")
        return {message: "Booking canceled successfully!"}
    }

    async deleteAllForUser(user: User): Promise<void> {
        const bookings = await this.getAllBookingsForUser(user);
        for (const booking of bookings) {
            await this.bookingRepository.remove(booking);
        }
    }

    async deleteAllForEvent(event: Event): Promise<void> {
        const bookings = await this.getAllBookingsForEvent(event);
        for (const booking of bookings) {
            await this.bookingRepository.remove(booking);
        }
    }
}
