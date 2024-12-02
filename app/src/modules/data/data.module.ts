import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BOOKING_DAO } from 'src/shared/contracts/dao/booking';
import { Booking, BookingSchema } from 'src/shared/entity/booking';
import { BookingDAO } from './dao/booking.dao';
import { BookingRepository } from './repository/booking.repository';
import { BOOKING_REPOSITORY } from 'src/shared/contracts/repository/booking';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({ uri: configService.get<string>('MONGO_URI') }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
  ],
  providers: [
    {
      provide: BOOKING_DAO,
      useClass: BookingDAO,
    },
    {
      provide: BOOKING_REPOSITORY,
      useClass: BookingRepository,
    },
  ],
  exports: [BOOKING_REPOSITORY],
})
export class DataModule { }
