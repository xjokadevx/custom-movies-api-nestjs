import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'Username of the user',
    required: true,
    default: 'test',
  })
  username: string;
  @ApiProperty({
    description: 'Password of the user',
    required: true,
    default: 'Hello1234*.',
  })
  password: string;
}
