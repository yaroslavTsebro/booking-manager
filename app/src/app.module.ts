import { Module } from '@nestjs/common';
import { BookingModule } from './modules/booking/booking.module';
import { DataModule } from './modules/data/data.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';

@Module({
  imports: [BookingModule, DataModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ]
})
export class AppModule {}
