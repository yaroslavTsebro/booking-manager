import { Test, TestingModule } from '@nestjs/testing';
import { BookingRepository } from 'src/modules/data/repository/booking.repository';
import { BOOKING_DAO, IBookingDAO } from 'src/shared/contracts/dao/booking';
import { CreateBookingDto } from 'src/shared/dto/booking/create';
import { Booking } from 'src/shared/entity/booking';

describe('BookingRepository', () => {
  let bookingRepository: BookingRepository;
  let bookingDAO: jest.Mocked<IBookingDAO>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingRepository,
        {
          provide: BOOKING_DAO,
          useValue: {
            save: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            deleteById: jest.fn(),
            findConflicts: jest.fn(),
          },
        },
      ],
    }).compile();

    bookingRepository = module.get<BookingRepository>(BookingRepository);
    bookingDAO = module.get<IBookingDAO>(BOOKING_DAO) as jest.Mocked<IBookingDAO>;
  });

  it('should create a booking', async () => {
    const createBookingDto: CreateBookingDto = {
      user: 'user123',
      date: '2023-12-01',
      startTime: '10:00',
      endTime: '11:00',
    };

    const expectedBooking: Booking = {
      id: 'booking123',
      ...createBookingDto,
    };

    bookingDAO.save.mockResolvedValue(expectedBooking);

    const result = await bookingRepository.createBooking(createBookingDto);

    expect(bookingDAO.save).toHaveBeenCalledWith(createBookingDto);
    expect(result).toEqual(expectedBooking);
  });

  it('should get all bookings', async () => {
    const expectedBookings: Booking[] = [
      {
        id: 'booking123',
        user: 'user123',
        date: '2023-12-01',
        startTime: '10:00',
        endTime: '11:00',
      },
      {
        id: 'booking456',
        user: 'user456',
        date: '2023-12-02',
        startTime: '12:00',
        endTime: '13:00',
      },
    ];

    bookingDAO.findAll.mockResolvedValue(expectedBookings);

    const result = await bookingRepository.getAllBookings();

    expect(bookingDAO.findAll).toHaveBeenCalled();
    expect(result).toEqual(expectedBookings);
  });

  it('should get a booking by ID', async () => {
    const bookingId = 'booking123';
    const expectedBooking: Booking = {
      id: bookingId,
      user: 'user123',
      date: '2023-12-01',
      startTime: '10:00',
      endTime: '11:00',
    };

    bookingDAO.findById.mockResolvedValue(expectedBooking);

    const result = await bookingRepository.getBookingById(bookingId);

    expect(bookingDAO.findById).toHaveBeenCalledWith(bookingId);
    expect(result).toEqual(expectedBooking);
  });

  it('should delete a booking by ID', async () => {
    const bookingId = 'booking123';

    bookingDAO.deleteById.mockResolvedValue(undefined);

    await bookingRepository.deleteBookingById(bookingId);

    expect(bookingDAO.deleteById).toHaveBeenCalledWith(bookingId);
  });

  it('should check for booking conflicts', async () => {
    const date = '2023-12-01';
    const startTime = '10:00';
    const endTime = '11:00';

    bookingDAO.findConflicts.mockResolvedValue(true);

    const hasConflict = await bookingRepository.checkForConflicts(date, startTime, endTime);

    expect(bookingDAO.findConflicts).toHaveBeenCalledWith(date, startTime, endTime);
    expect(hasConflict).toBe(true);
  });
});
