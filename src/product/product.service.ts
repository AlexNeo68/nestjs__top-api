import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { FindProductDto } from 'src/product/dto/find-product.dto';
import { ProductModel } from 'src/product/product.model';
import { ReviewModel } from 'src/review/review.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('ProductModel')
    private readonly productModel: ModelType<ProductModel>,
  ) {}

  async create(dto: CreateProductDto) {
    return await this.productModel.create(dto);
  }

  async findById(id: string) {
    return await this.productModel.findById(new Types.ObjectId(id));
  }

  async deleteById(id: string) {
    return await this.productModel.findByIdAndRemove(new Types.ObjectId(id));
  }

  async updateById(id: string, dto: CreateProductDto) {
    return await this.productModel.findByIdAndUpdate(
      new Types.ObjectId(id),
      dto,
      { new: true },
    );
  }

  async findWithReviews(dto: FindProductDto) {
    return (await this.productModel.aggregate([
      { $match: { categories: dto.category } },
      {
        $sort: {
          _id: 1,
        },
      },
      { $limit: dto.limit },
      {
        $lookup: {
          from: 'review',
          localField: '_id',
          foreignField: 'productId',
          as: 'reviews',
        },
      },
      {
        $addFields: {
          reviewCount: {
            $size: '$reviews',
          },
          reviewAvg: {
            $avg: '$reviews.rating',
          },
          reviews: {
            $function: {
              body: `function (reviews) {
								reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
								return reviews;
							}`,
              args: ['$reviews'],
              lang: 'js',
            },
          },
        },
      },
    ])) as (ProductModel & {
      reviews: ReviewModel[];
      reviewCount: number;
      reviewAvg: number;
    })[];
  }
}
