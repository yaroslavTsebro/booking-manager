import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IBookingDAO } from 'src/shared/contracts/dao/booking';
import { Booking, BookingDocument } from 'src/shared/entity/booking';
import { BookingMapper } from 'src/shared/system/documentToBook';

@Injectable()
export class BookingDAO implements IBookingDAO {
  constructor(
    @InjectModel(BookingDocument.name)
    private readonly bookingModel: Model<BookingDocument>,
  ) {}

  async save(booking: Partial<Booking>): Promise<Booking> {
    const newBooking = new this.bookingModel(booking);
    const savedBooking = await newBooking.save();
    return BookingMapper.toBookingType(savedBooking);
  }

  async findAll(): Promise<Booking[]> {
    const bookings = await this.bookingModel.find().exec();
    return bookings.map(BookingMapper.toBookingType);
  }

  async findById(id: string): Promise<Booking | null> {
    const objectId = new Types.ObjectId(id);
    const booking = await this.bookingModel.findById(objectId).exec();
    return booking ? BookingMapper.toBookingType(booking) : null;
  }

  async deleteById(id: string): Promise<void> {
    const objectId = new Types.ObjectId(id);
    await this.bookingModel.findByIdAndDelete(objectId).exec();
  }

  async findConflicts(
    date: string,
    startTime: string,
    endTime: string,
  ): Promise<boolean> {
    const conflict = await this.bookingModel
      .findOne({
        date,
        $or: [
          { startTime: { $lt: endTime, $gte: startTime } },
          { endTime: { $gt: startTime, $lte: endTime } },
        ],
      })
      .exec();
    return !!conflict;
  }
}
