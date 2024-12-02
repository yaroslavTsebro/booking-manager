import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Types, Document } from 'mongoose';
import { IBooking } from '../contracts/entity/booking';

@ObjectType()
export class Booking implements IBooking {
  @Field(() => ID)
  id: string;

  @Field()
  user: string;

  @Field()
  date: string;

  @Field()
  startTime: string;

  @Field()
  endTime: string;
}


@Schema()
export class BookingDocument extends Document {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  startTime: string;

  @Prop({ required: true })
  endTime: string;

  toJSON() {
    const obj = this.toObject();
    obj.id = obj._id.toString(); 
    delete obj._id;
    delete obj.__v;
    return obj;
  }
}

export const BookingSchema = SchemaFactory.createForClass(BookingDocument);

