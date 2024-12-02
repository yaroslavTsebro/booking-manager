import { IsMilitaryTime, IsNotEmpty, IsString, Matches } from 'class-validator';
import { ICreateBookingDto } from 'src/shared/contracts/dto/booking/create';

export class CreateBookingDto implements ICreateBookingDto {
  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/)
  date: string;

  @IsNotEmpty()
  @IsMilitaryTime()
  startTime: string;

  @IsNotEmpty()
  @IsMilitaryTime()
  endTime: string;
}
