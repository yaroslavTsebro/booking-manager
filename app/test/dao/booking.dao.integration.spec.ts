// booking.dao.spec.ts

import { Booking, BookingDocument, BookingSchema } from 'src/shared/entity/booking';
import { Model, connect, Connection } from 'mongoose';
import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { BookingDAO } from 'src/modules/data/dao/booking.dao';
import { ICreateBookingDto } from 'src/shared/contracts/dto/booking/create';

describe('BookingDAO', () => {
  let bookingDao: BookingDAO;
  let mongoContainer: StartedTestContainer;
  let mongoUri: string;
  let mongoConnection: Connection;
  let bookingModel: Model<BookingDocument>;

  beforeAll(async () => {
    mongoContainer = await new GenericContainer('mongo')
      .withExposedPorts(27017)
      .start();

    const host = mongoContainer.getHost();
    const port = mongoContainer.getMappedPort(27017);
    mongoUri = `mongodb://${host}:${port}`;

    mongoConnection = (await connect(mongoUri)).connection;

    bookingModel = mongoConnection.model(BookingDocument.name, BookingSchema);

    bookingDao = new BookingDAO(bookingModel);
  });

  afterAll(async () => {
    await mongoConnection.close();
    await mongoContainer.stop();
  });

  beforeEach(async () => {
    await bookingModel.deleteMany({});
  });

  it('should save a booking and return a Booking object', async () => {
    const bookingData: ICreateBookingDto = {
      user: 'user123',
      date: '2023-12-01',
      startTime: '10:00',
      endTime: '11:00',
    };

    const savedBooking = await bookingDao.save(bookingData);

    expect(savedBooking).toBeDefined();
    expect(savedBooking.id).toBeDefined();
    expect(savedBooking.date).toBe(bookingData.date);
    expect(savedBooking.user).toBe(bookingData.user);
  });

  it('should find all bookings and return an array of Booking objects', async () => {
    const bookingData1: ICreateBookingDto = {
      user: 'user123',
      date: '2023-12-01',
      startTime: '10:00',
      endTime: '11:00',
    };

    const bookingData2: ICreateBookingDto = {
      user: 'user456',
      date: '2023-12-02',
      startTime: '12:00',
      endTime: '13:00',
    };

    await bookingDao.save(bookingData1);
    await bookingDao.save(bookingData2);

    const bookings = await bookingDao.findAll();

    expect(bookings).toHaveLength(2);
    expect(bookings[0]).toBeInstanceOf(Object);
    expect(bookings[0].user).toBeDefined();
  });

  it('should find a booking by ID and return a Booking object', async () => {
    const bookingData: ICreateBookingDto = {
      user: 'user123',
      date: '2023-12-01',
      startTime: '10:00',
      endTime: '11:00',
    };

    const savedBooking = await bookingDao.save(bookingData);

    const foundBooking = await bookingDao.findById(savedBooking.id);

    expect(foundBooking).toBeDefined();
    expect(foundBooking?.id).toBe(savedBooking.id);
    expect(foundBooking?.user).toBe(savedBooking.user);
  });

  it('should delete a booking by ID', async () => {
    const bookingData: ICreateBookingDto = {
      user: 'user123',
      date: '2023-12-01',
      startTime: '10:00',
      endTime: '11:00',
    };

    const savedBooking = await bookingDao.save(bookingData);

    await bookingDao.deleteById(savedBooking.id);

    const foundBooking = await bookingDao.findById(savedBooking.id);

    expect(foundBooking).toBeNull();
  });

  it('should determine if there are conflicts', async () => {
    const existingBookingData: ICreateBookingDto = {
      user: 'user123',
      date: '2023-12-01',
      startTime: '10:00',
      endTime: '11:00',
    };

    await bookingDao.save(existingBookingData);

    const hasConflict = await bookingDao.findConflicts('2023-12-01', '10:30', '11:30');

    expect(hasConflict).toBe(true);

    const hasNoConflict = await bookingDao.findConflicts('2023-12-01', '11:00', '12:00');

    expect(hasNoConflict).toBe(false);
  });
});
