import { Inject, Injectable } from '@nestjs/common';
import { BOOKING_DAO, IBookingDAO } from 'src/shared/contracts/dao/booking';
import { IBookingRepository } from 'src/shared/contracts/repository/booking';
import { CreateBookingDto } from 'src/shared/dto/booking/create';
import { Booking } from 'src/shared/entity/booking';

@Injectable()
export class BookingRepository implements IBookingRepository {
  constructor(@Inject(BOOKING_DAO) private readonly bookingDAO: IBookingDAO) {}

  async createBooking(booking: CreateBookingDto): Promise<Booking> {
    return await this.bookingDAO.save(booking);
  }

  async getAllBookings(): Promise<Booking[]> {
    return await this.bookingDAO.findAll();
  }

  async getBookingById(id: string): Promise<Booking | null> {
    return await this.bookingDAO.findById(id);
  }

  async deleteBookingById(id: string): Promise<void> {
    await this.bookingDAO.deleteById(id);
  }

  async checkForConflicts(date: string, startTime: string, endTime: string): Promise<boolean> {
    return await this.bookingDAO.findConflicts(date, startTime, endTime);
  }
}
