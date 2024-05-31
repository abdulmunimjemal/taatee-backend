import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Event } from './entities';
import { EventDto, UpdateEventDto } from './dto';
import { BookingService } from '../booking/booking.service';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly bookingService: BookingService
  ) {}

  getAllEvents(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  async getEventById(id: number, loadRelations: boolean = false): Promise<Event> {
    let query: FindOneOptions<Event> = {
        where: {
            id: id,
        },
    };

    if (loadRelations) {
        query.relations = ["bookings"];
    }

    const event = await this.eventRepository.findOne(query);

    if (!event) {
        throw new NotFoundException(`Event With id ${id} is not found.`);
    }
    return event;
}


  createEvent(event: EventDto): Promise<Event> {
    const result = this.eventRepository.save(event);
    if (!result) {
      throw new BadRequestException("Error Creating Event");
    }
    
    return result;
  }

  async updateEvent(id: number, updatedEvent: UpdateEventDto): Promise<Event> {
    const existingEvent =  await this.getEventById(id)

    if (!existingEvent) {
      throw new NotFoundException(`Event with ID #${id} is not found.`)
    }

    Object.assign(existingEvent, updatedEvent)
    const result = await this.eventRepository.save(existingEvent)

    if (!result) {
      throw new BadRequestException("Bad Request!");
    }
    
    return existingEvent;
  }

  async deleteEvent(id: number): Promise<void> {
    const event = await this.getEventById(id);
    if (!event) {
      throw new NotFoundException(`Deletion Failed. Event Not Found.`);
    }
    // delete all bookings assocaited with it
    await this.bookingService.deleteAllForEvent(event);

    await this.eventRepository.remove(event);
  }
}
