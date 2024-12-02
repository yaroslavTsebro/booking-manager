import { ConflictException } from '@nestjs/common';

export class BookingConflictException extends ConflictException {
  constructor(date: string, startTime: string, endTime: string) {
    super(`Booking conflict detected for ${date} between ${startTime} and ${endTime}.`);
  }
}
