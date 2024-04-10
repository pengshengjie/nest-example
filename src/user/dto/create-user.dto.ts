import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  MaxLength,
  MinLength,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(25)
  username: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;
}
