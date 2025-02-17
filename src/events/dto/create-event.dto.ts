import { IsString, IsNotEmpty, IsDateString, IsInt } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  description!: string;

  @IsDateString()
  date!: string;

  @IsString()
  location!: string;

  @IsInt()
  seats!: number;
}
