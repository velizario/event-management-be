import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async bookEvent(userId: string, eventId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: { bookings: true },
    });

    if (!event) {
      throw new BadRequestException('Event not found');
    }

    if (event.bookings.length >= event.seats) {
      throw new BadRequestException('No seats available');
    }

    const existingBooking = await this.prisma.booking.findFirst({
      where: { userId, eventId },
    });
    if (existingBooking) {
      throw new BadRequestException('User already booked this event');
    }

    return this.prisma.booking.create({
      data: {
        userId,
        eventId,
      },
    });
  }

  async getUserBookings(userId: string) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: { event: true },
    });
  }
}
