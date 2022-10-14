import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly content: string;

  @ApiProperty()
  readonly date: string;
}
