import { Type } from 'class-transformer';
import { IsEnum } from 'class-validator';

enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}
export class FindTopPageDto {
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;
}
