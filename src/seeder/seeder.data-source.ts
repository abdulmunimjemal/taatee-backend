// data-source.ts
import { Role } from '../auth/role/role.enum';


export const userData = [
  {
    email: 'salman@gmail.com',
    firstName: 'Salman',
    lastName: 'Ali',
    password: 'pass1234', // hasing takes place in the seeder service
    role: Role.Admin,
  },
  
  {
    email: 'meti@gmail.com',
    firstName: 'Meti',
    lastName: 'Lamessa',
    password: 'pass1234', // hasing takes place in the seeder service
    role: Role.User,
  },
  {
    email: 'munim@gmail.com',
    firstName: 'Abdulmunim',
    lastName: 'Jundurahman',
    password: 'pass1234',
    role: Role.User,
  },
  {
    email: 'sifan@gmail.com',
    firstName: 'Sifan',
    lastName: 'Fita',
    password: 'pass1234',
    role: Role.User,
  },

  // Add more user data as needed
];

export const eventData = [
  {
    eventName: 'January Tech Fest',
    eventDate: new Date('2024-01-15T12:00:00Z'),
    description: 'A tech fest for all tech enthusiasts. Never miss it! The first of its type, by AAiT Tech Club',
    location: 'AAiT Auditorium',
    maxBooking: 100,
  },
  {
    eventName: 'Half Life Networking Event',
    eventDate: new Date('2024-05-15T12:00:00Z'),
    description: 'A networking event for all tech enthusiasts. Never miss it! The first of its type, by AAiT Tech Club',
    location: 'AAiT Auditorium',
    maxBooking: 120,
  },
];
