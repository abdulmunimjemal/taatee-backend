// event.dto.ts
import { IsNotEmpty, IsString, IsDateString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class EventDto {
  @IsNotEmpty()
  @IsString()
  eventName: string;

  @IsNotEmpty()
  @IsDateString()
  eventDate: Date;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsOptional()
  @IsBoolean()
  isCanceled?: boolean;

  @IsOptional()
  @IsNumber()
  maxBooking?: number;
}
