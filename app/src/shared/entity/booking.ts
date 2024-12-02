import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { IBooking } from 'src/shared/contracts/entity/booking';

@ObjectType()
@Schema()
export class Booking implements IBooking {
  @Field()
  @Prop({ type: Types.ObjectId, auto: true })
  id: string;

  @Field()
  @Prop({ required: true })
  user: string;

  @Field()
  @Prop({ required: true })
  date: string;

  @Field()
  @Prop({ required: true })
  startTime: string;

  @Field()
  @Prop({ required: true })
  endTime: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
