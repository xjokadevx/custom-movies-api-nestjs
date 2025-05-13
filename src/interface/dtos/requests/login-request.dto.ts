import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'Phone of the user',
    required: true,
    default: '8310000000',
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
}
