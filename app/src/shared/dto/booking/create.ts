import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ICreateBookingDto } from 'src/shared/contracts/dto/booking/create';

export class CreateBookingDto implements ICreateBookingDto {
  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  date: string;

  @IsNotEmpty()
  @Matches(/^\d{2}:\d{2}$/)
  startTime: string;

  @IsNotEmpty()
  @Matches(/^\d{2}:\d{2}$/)
  endTime: string;
}
