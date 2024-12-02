import { Injectable, ConflictException, NotFoundException, Inject } from '@nestjs/common';
import { ICreateBookingDto } from 'src/shared/contracts/dto/booking/create';
import { IBooking } from 'src/shared/contracts/entity/booking';
import { BOOKING_REPOSITORY, IBookingRepository } from 'src/shared/contracts/repository/booking';

@Injectable()
export class BookingService {
  constructor(
    @Inject(BOOKING_REPOSITORY) private readonly bookingRepository: IBookingRepository,
  ) { }

  async createBooking(booking: ICreateBookingDto): Promise<IBooking> {
    const { date, startTime, endTime } = booking;

    const conflict = await this.bookingRepository.checkForConflicts(date, startTime, endTime);
    if (conflict) {
      throw new ConflictException('Time slot already booked.');
    }

    return this.bookingRepository.createBooking(booking);
  }

  async getAllBookings(): Promise<IBooking[]> {
    return this.bookingRepository.getAllBookings();
  }

  async getBookingById(id: string): Promise<IBooking> {
    const booking = await this.bookingRepository.getBookingById(id);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  async deleteBooking(id: string): Promise<void> {
    await this.bookingRepository.deleteBookingById(id);
  }
}
