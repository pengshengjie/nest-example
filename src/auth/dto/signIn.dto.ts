import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignInDto {
  @IsString({ message: '用户名不能为空' })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(25)
  username: string;

  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
