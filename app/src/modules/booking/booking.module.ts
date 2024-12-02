import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingResolver } from './booking.resolver';
import { DataModule } from '../data/data.module';

@Module({
  imports:[DataModule],
  providers: [BookingService, BookingResolver]
})
export class BookingModule {}
