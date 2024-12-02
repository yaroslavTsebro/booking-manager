import { NotFoundException } from '@nestjs/common';

export class BookingNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Booking with ID "${id}" not found.`);
  }
}
