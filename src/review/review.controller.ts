import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { ReviewDto } from './dto/review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.contstants';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserEmailDecorator } from 'src/decorators/user-email.decorator';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: ReviewDto) {
    return this.reviewService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() id: string) {
    const deleteDoc = this.reviewService.delete(id);
    if (!deleteDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-product/:productId')
  async getByProduct(
    @Param('productId') productId: string,
    @UserEmailDecorator() email: string,
  ) {
    console.log(email);
    return this.reviewService.findByProducId(productId);
  }

  @Delete('delete-by-product/:productId')
  async deleteByProduct(@Param('productId') productId: string) {
    return this.reviewService.deleteByProductId(productId);
  }
}
