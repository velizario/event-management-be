import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async createEvent(userId: string, dto: CreateEventDto) {
    return this.prisma.event.create({
      data: {
        title: dto.title,
        description: dto.description,
        date: new Date(dto.date),
        location: dto.location,
        seats: dto.seats,
        createdBy: userId,
      },
    });
  }

  async getAll() {
    return this.prisma.event.findMany({
      include: { bookings: true },
    });
  }

  async getById(id: string) {
    return this.prisma.event.findUnique({
      where: { id },
      include: { bookings: true },
    });
  }

  async updateEvent(eventId: string, dto: UpdateEventDto) {
    return this.prisma.event.update({
      where: { id: eventId },
      data: { ...dto, date: new Date(dto.date!) },
    });
  }

  async deleteEvent(eventId: string) {
    return this.prisma.event.delete({ where: { id: eventId } });
  }
}
