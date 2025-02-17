import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthRequest } from 'src/interfaces/auth-request.interface';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Request() req : AuthRequest, @Body() dto: CreateEventDto) {
    return this.eventsService.createEvent(req.user.userId, dto);
  }

  @Get()
  async findAll() {
    return this.eventsService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eventsService.getById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateEventDto) {
    return this.eventsService.updateEvent(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.eventsService.deleteEvent(id);
  }
}
