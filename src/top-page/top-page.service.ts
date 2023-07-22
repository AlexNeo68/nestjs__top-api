import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { CreateTopPageDto } from 'src/top-page/dto/create-top-page.dto';
import { FindTopPageDto } from 'src/top-page/dto/find-top-page.dto';
import { TopPageModel } from 'src/top-page/top-page.model';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel('TopPageModel')
    private readonly topPageModel: ModelType<TopPageModel>,
  ) {}

  async create(dto: CreateTopPageDto) {
    return await this.topPageModel.create(dto);
  }

  async findById(id: string) {
    return await this.topPageModel.findById(new Types.ObjectId(id));
  }

  async findByAlias(alias: string) {
    return await this.topPageModel.findOne({ alias });
  }

  async findByFirstCategory(dto: FindTopPageDto) {
    // return await this.topPageModel
    //   .aggregate()
    //   .match({
    //     firstCategory: dto.firstCategory,
    //   })
    //   .group({
    //     _id: { secondaryCategory: '$secondaryCategory' },
    //     pages: {
    //       $push: {
    //         title: '$title',
    //         alias: '$alias',
    //         category: '$category',
    //         _id: '$_id',
    //       },
    //     },
    //   });
    return await this.topPageModel
      .aggregate()
      .match({
        firstCategory: dto.firstCategory,
      })
      .group({
        _id: { secondaryCategory: '$secondaryCategory' },
        pages: {
          $push: {
            alias: '$alias',
            title: '$title',
            _id: '$_id',
            category: '$category',
          },
        },
      });
  }

  async findByText(text: string) {
    return await this.topPageModel.find({
      $text: { $search: text, $caseSensitive: false },
    });
  }

  async deleteById(id: string) {
    return await this.topPageModel.findByIdAndRemove(new Types.ObjectId(id));
  }

  async updateById(id: string, dto: CreateTopPageDto) {
    return await this.topPageModel.findByIdAndUpdate(
      new Types.ObjectId(id),
      dto,
      { new: true },
    );
  }
}
