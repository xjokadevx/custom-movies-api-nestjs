import { ApiResponseProperty } from '@nestjs/swagger';

export class MovieChangedResponseDto {
  @ApiResponseProperty()
  data: string;
  @ApiResponseProperty()
  result: boolean;
}
