import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ModelType } from '@typegoose/typegoose/lib/types';
import { AuthDto } from 'src/auth/dto/auth.dto';

import { UserModel } from 'src/auth/user.model';

import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('UserModel')
    private readonly userModel: ModelType<UserModel>,
  ) {}

  async createUser(dto: AuthDto) {
    const salt = genSaltSync(10);
    const user = new this.userModel({
      email: dto.email,
      passwordHash: hashSync(dto.password, salt),
    });
    return await user.save();
  }

  async findUser(email: string) {
    return await this.userModel.findOne({ email });
  }
}
