import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'bookingTime', async: false })
export class BookingTimeValidator implements ValidatorConstraintInterface {
  validate(endTime: string, args: ValidationArguments): boolean {
    const object = args.object as Record<string, any>;

    const startTime = object['startTime'];
    const date = object['date'];

    if (!startTime || !date) {
      return false;
    }

    const startDateTime = new Date(`${date}T${startTime}`);
    const endDateTime = new Date(`${date}T${endTime}`);

    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
      return false;
    }

    return startDateTime < endDateTime;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'Start time must be earlier than end time and within the same day.';
  }
}
