
  // booking.dto.ts
  import { Exclude, Expose, Transform } from 'class-transformer';

  @Exclude()
  export class UpdatingBookingDto {
    @Expose()
    bookingDate: Date;
  
    @Expose()
    @Transform(({ value }) => value.id) // Transform the event property to include only its id
    event: { id: number };

}
  