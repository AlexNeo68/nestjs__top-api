import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FindTopPageDto } from 'src/top-page/dto/find-top-page.dto';
import { TopPageModel } from 'src/top-page/top-page.model';

@Controller('top-page')
export class TopPageController {
  @Post('create')
  async create(@Body() dto: Omit<TopPageModel, '_id'>) {}

  @Get(':id')
  async show(@Param() id: string) {}

  @Patch(':id')
  async update(@Param() id: string, @Body() dto: TopPageModel) {}

  @Delete(':id')
  async delete(@Param() id: string) {}

  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindTopPageDto) {}
}
