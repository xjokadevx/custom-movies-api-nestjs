import { ApiResponseProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiResponseProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR...',
    type: 'string',
  })
  token: string;
}
