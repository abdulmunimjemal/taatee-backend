import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../auth/role/';
import { Booking } from '../../booking/entities/';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @OneToMany(() => Booking, booking => booking.user)
    bookings: Booking[];

    @Column({ default: Role.User})
    role: string;
}