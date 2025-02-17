import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthRequest } from '../interfaces/auth-request.interface';

@Controller('bookings')
@UseGuards(AuthGuard('jwt'))
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Post(':eventId')
  async book(@Request() req: AuthRequest, @Param('eventId') eventId: string) {
    return this.bookingsService.bookEvent(req.user.userId, eventId);
  }

  @Get()
  async getMyBookings(@Request() req: AuthRequest) {
    return this.bookingsService.getUserBookings(req.user.userId);
  }
}
