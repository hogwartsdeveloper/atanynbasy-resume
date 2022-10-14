import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class MessageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  readonly content: string;

  @IsNotEmpty()
  @MinLength(10)
  @ApiProperty()
  readonly date: string;
}
