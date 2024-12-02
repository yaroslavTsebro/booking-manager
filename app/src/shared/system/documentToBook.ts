import { IBooking } from '../contracts/entity/booking';
import { Booking } from '../entity/booking';

export class BookingMapper {
  static toBookingType(booking: IBooking): Booking {
    return {
      id: booking.id,
      user: booking.user,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
    };
  }
}