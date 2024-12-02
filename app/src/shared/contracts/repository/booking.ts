import { ICreateBookingDto } from '../dto/booking/create';
import { IBooking } from '../entity/booking';

export const BOOKING_REPOSITORY = Symbol('BookingRepository');

export interface IBookingRepository {
  createBooking(booking: ICreateBookingDto): Promise<IBooking>;
  getAllBookings(): Promise<IBooking[]>;
  getBookingById(id: string): Promise<IBooking | null>;
  deleteBookingById(id: string): Promise<void>;
  checkForConflicts(date: string, startTime: string, endTime: string): Promise<boolean>;
}