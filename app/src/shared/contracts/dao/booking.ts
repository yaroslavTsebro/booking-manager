import { ICreateBookingDto } from '../dto/booking/create';
import { IBooking } from '../entity/booking';

export const BOOKING_DAO = Symbol('BookingDao');

export interface IBookingDAO {
  save(booking: ICreateBookingDto): Promise<IBooking>;
  findAll(): Promise<IBooking[]>;
  findById(id: string): Promise<IBooking | null>;
  deleteById(id: string): Promise<void>;
  findConflicts(date: string, startTime: string, endTime: string): Promise<boolean>;
}