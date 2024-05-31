
  // booking.dto.ts
import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class BookingDto {
  @Expose()
  id: number;

  @Expose()
  bookingDate: Date;

  @Expose()
  @Transform(({ value }) => value.id) // Transform the event property to include only its id
  event: { id: number };

  @Expose()
  @Transform(({ value }) => ({
    id: value.id,
    email: value.email,
    firstName: value.firstName,
    lastName: value.lastName,
    role: value.role,
  })) // Transform the user property to include only specified properties
  user: { id: number; email: string; firstName: string; lastName: string; role: string };
}
