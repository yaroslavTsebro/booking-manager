import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBookingDAO } from 'src/shared/contracts/dao/booking';
import { Booking } from 'src/shared/entity/booking';

@Injectable()
export class BookingDAO implements IBookingDAO {
  constructor(
    @InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
  ) {}

  async save(booking: Partial<Booking>): Promise<Booking> {
    const newBooking = new this.bookingModel(booking);
    return await newBooking.save();
  }

  async findAll(): Promise<Booking[]> {
    return await this.bookingModel.find().exec();
  }

  async findById(id: string): Promise<Booking | null> {
    return await this.bookingModel.findById(id).exec();
  }

  async deleteById(id: string): Promise<void> {
    await this.bookingModel.findByIdAndDelete(id).exec();
  }

  async findConflicts(date: string, startTime: string, endTime: string): Promise<boolean> {
    return !!(await this.bookingModel.findOne({
      date,
      $or: [
        { startTime: { $lt: endTime, $gte: startTime } },
        { endTime: { $gt: startTime, $lte: endTime } },
      ],
    }).exec());
  }
}
