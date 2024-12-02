import { Booking, BookingDocument } from '../entity/booking';

export class BookingMapper {
  static toBookingType(booking: BookingDocument): Booking {
    return {
      id: booking.id,
      user: booking.user,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
    };
  }
}