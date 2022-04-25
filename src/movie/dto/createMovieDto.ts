import { ApiProperty } from '@nestjs/swagger';

export class createMovieDTO  {
  @ApiProperty()
  name: string;

  @ApiProperty()
  overview: string;
}