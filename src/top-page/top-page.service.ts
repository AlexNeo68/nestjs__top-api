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

  async find(dto: FindTopPageDto) {
    return await this.topPageModel.find({ firstCategory: dto.firstCategory });
  }
}
