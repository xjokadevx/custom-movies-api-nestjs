import { ApiProperty } from '@nestjs/swagger';

export class SignUpUserDto {
  @ApiProperty({
    description: 'Name of the user',
    required: true,
    default: 'test',
  })
  name: string;
  @ApiProperty({
    description: 'Phone of the user',
    required: true,
    default: '8330000000',
  })
  phone: string;
  @ApiProperty({
    description: 'Password of the user',
    required: true,
    default: 'Hello1234*.',
  })
  password: string;
  @ApiProperty({
    description: 'roleId of the user',
    required: true,
    type: Number,
    default: 2,
  })
  roleId: number;
}
