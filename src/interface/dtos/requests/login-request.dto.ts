import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'Phone of the user',
    required: true,
    default: '8310000000',
  })
  phone: string;
  @ApiProperty({
    description: 'Password of the user',
    required: true,
    default: 'Hello1234*.',
  })
  password: string;
}
