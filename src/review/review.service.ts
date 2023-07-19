import { Injectable } from '@nestjs/common';
import { ReviewModel } from './review.model';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { ReviewDto } from './dto/review.dto';
import { Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

class Leak {}
const leaks = [];

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel('ReviewModel')
    private readonly reviewModel: ModelType<ReviewModel>,
  ) {}

  async create(dto: ReviewDto): Promise<DocumentType<ReviewModel>> {
    dto.productId = new Types.ObjectId(dto.productId);
    return this.reviewModel.create(dto);
  }
  async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findByProducId(
    productId: string,
  ): Promise<DocumentType<ReviewModel>[]> {
    leaks.push(new Leak());
    return this.reviewModel
      .find({ productId: new Types.ObjectId(productId) })
      .exec();
  }

  async deleteByProductId(productId: string) {
    return this.reviewModel
      .deleteMany({
        productId: new Types.ObjectId(productId),
      })
      .exec();
  }
}
