import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Missing fields' })
  message: string | string[];

  @ApiProperty({ example: '2025-05-10T20:45:00.000Z' })
  timestamp: string;

  @ApiProperty({ example: '/auth/login' })
  path: string;
}
