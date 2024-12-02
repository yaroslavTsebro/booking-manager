import { Module } from '@nestjs/common';
import { BookingModule } from './modules/booking/booking.module';
import { DataModule } from './modules/data/data.module';

@Module({
  imports: [BookingModule, DataModule],
})
export class AppModule {}
