import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BeforeInsert } from 'typeorm';
import { Booking } from '../../booking/entities/'; // Assuming you create a Booking entity

@Entity()
export class Event {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eventName: string;

  @Column({ type: 'timestamp' })
  eventDate: Date;

  @Column()
  location: string;

  @Column()
  description: string;

  @Column({ default: false })
  isCanceled: boolean;

  @Column({ nullable: true })
  maxBooking: number;

  @OneToMany(() => Booking, booking => booking.event)
  bookings: Booking[];

  @BeforeInsert()
  initializeBookings() {
    this.bookings = []; // Initialize the bookings array when a new user is inserted
  }
}
