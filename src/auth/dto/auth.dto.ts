import { IsString } from 'class-validator';

export class AuthDto {
  @IsString({ message: 'Email должен содержать не пустую строку' })
  email: string;

  @IsString({ message: 'Пароль должен содержать не пустую строку' })
  password: string;
}
