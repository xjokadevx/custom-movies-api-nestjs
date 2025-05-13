import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, Matches, IsNumber } from 'class-validator';

export class SignUpUserDto {
  @ApiProperty({
    description: 'Name of the user',
    required: true,
    default: 'test',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Phone of the user',
    required: true,
    default: '8330000000',
  })
  @MinLength(10)
  @IsNotEmpty()
  @Matches(/^\d{10}$/, {
    message: 'Phone number must be 10 digits and contain only digits (0-9).',
  })
  phone: string;

  @ApiProperty({
    description: 'Password of the user',
    required: true,
    default: 'Hello1234*.',
  })
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message:
      'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
  })
  password: string;
  @ApiProperty({
    description: 'roleId of the user. 1 for admin, 2 for user',
    required: true,
    type: Number,
    default: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  roleId: number;
}
