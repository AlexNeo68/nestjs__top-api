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
import { FindProductDto } from 'src/product/dto/find-product.dto';
import { ProductModel } from 'src/product/product.model';

@Controller('product')
export class ProductController {
  @Post('create')
  async create(@Body() dto: Omit<ProductModel, '_id'>) {}

  @Get(':id')
  async show(@Param() id: string) {}

  @Patch(':id')
  async update(@Param() id: string, @Body() dto: ProductModel) {}

  @Delete(':id')
  async delete(@Param() id: string) {}

  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindProductDto) {}
}
