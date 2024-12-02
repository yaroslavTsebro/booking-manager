import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateBookingDto } from 'src/shared/dto/booking/create';
import { Booking } from 'src/shared/entity/booking';
import { BookingService } from './booking.service';

@Resolver(() => Booking)
export class BookingResolver {
  constructor(private readonly bookingService: BookingService) { }

  @Query(() => [Booking], { name: 'bookings' })
  async getAllBookings(): Promise<Booking[]> {
    return this.bookingService.getAllBookings();
  }

  @Query(() => Booking, { name: 'booking' })
  async getBookingById(@Args('id') id: string): Promise<Booking> {
    return this.bookingService.getBookingById(id);
  }

  @Mutation(() => Booking)
  async createBooking(
    @Args('createBookingDto') createBookingDto: CreateBookingDto,
  ): Promise<Booking> {
    try {
      return await this.bookingService.createBooking(createBookingDto);
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => Boolean)
  async deleteBooking(@Args('id') id: string): Promise<boolean> {
    await this.bookingService.deleteBooking(id);
    return true;
  }
}