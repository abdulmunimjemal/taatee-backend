import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Event } from '../../event/entities/';
import { User } from '../../user/entities/';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookingDate: Date;

  @ManyToOne(() => Event, event => event.bookings)
  event: Event;

  @ManyToOne(() => User, user => user.bookings)
  user: User;
}