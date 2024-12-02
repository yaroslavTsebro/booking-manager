import { Injectable, Inject } from '@nestjs/common';
import { ICreateBookingDto } from 'src/shared/contracts/dto/booking/create';
import { IBooking } from 'src/shared/contracts/entity/booking';
import { BOOKING_REPOSITORY, IBookingRepository } from 'src/shared/contracts/repository/booking';
import { Booking } from 'src/shared/entity/booking';
import { BookingConflictException } from 'src/shared/exceptions/booking-conflict.exception';
import { BookingNotFoundException } from 'src/shared/exceptions/booking-not-found.exception';
import { BookingMapper } from 'src/shared/system/documentToBook';

@Injectable()
export class BookingService {
  constructor(@Inject(BOOKING_REPOSITORY) private readonly bookingRepository: IBookingRepository) { }

  async createBooking(createBookingDto: ICreateBookingDto): Promise<Booking> {
    const newBooking = await this.bookingRepository.createBooking(createBookingDto);
    return BookingMapper.toBookingType(newBooking);
  }

  async getAllBookings(): Promise<Booking[]> {
    const bookings = await this.bookingRepository.getAllBookings();
    return bookings.map((booking) => BookingMapper.toBookingType(booking));
  }

  async getBookingById(id: string): Promise<Booking> {
    const booking = await this.bookingRepository.getBookingById(id);
    if (!booking) {
      throw new Error(`Booking with ID ${id} not found`);
    }
    return BookingMapper.toBookingType(booking);
  }

  async deleteBooking(id: string): Promise<void> {
    const booking = await this.getBookingById(id);

    if (!booking) { throw new BookingNotFoundException(id); }

    await this.bookingRepository.deleteBookingById(id);
  }
}