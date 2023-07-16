import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ModelType } from '@typegoose/typegoose/lib/types';
import { AuthDto } from 'src/auth/dto/auth.dto';

import { UserModel } from 'src/auth/user.model';
import { JwtService } from '@nestjs/jwt';

import { genSaltSync, hashSync, compare } from 'bcryptjs';
import {
  USER_INCORRECT_PASSWORD,
  USER_NOT_FOUND,
} from 'src/auth/auth.constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('UserModel')
    private readonly userModel: ModelType<UserModel>,
    private readonly jwtService: JwtService,
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

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<UserModel, 'email'>> {
    const user = await this.findUser(email);
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(USER_INCORRECT_PASSWORD);
    }
    return { email: user.email };
  }

  async login(email: string) {
    const payload = { email };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
