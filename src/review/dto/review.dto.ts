import { IsString, IsNumber, Max, Min } from 'class-validator';
import { Types } from 'mongoose';
export class ReviewDto {
  @IsString({ message: 'Заголовок должен быть строкой' })
  title: string;

  @IsString({ message: 'Описание должно содержать текст' })
  description: string;

  @IsString({ message: 'Название должно быть строкой' })
  name: string;

  @IsNumber()
  @Max(5, { message: 'Рейтинг должен содержать числовое значение не больше 5' })
  @Min(1, { message: 'Рейтинг должен содержать числовое значение не меньше 1' })
  rating: number;

  @IsString({ message: 'Необходимо указать ID связанного с отзывом товара' })
  productId: Types.ObjectId;
}
