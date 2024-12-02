import { IsMilitaryTime, IsNotEmpty, IsString, Matches } from 'class-validator';
import { ICreateBookingDto } from 'src/shared/contracts/dto/booking/create';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookingDto implements ICreateBookingDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  user: string;

  @Field()
  @IsNotEmpty()
  @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/)
  date: string;

  @Field()
  @IsNotEmpty()
  @IsMilitaryTime()
  startTime: string;

  @Field()
  @IsNotEmpty()
  @IsMilitaryTime()
  endTime: string;
}
