import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthModel } from 'src/auth/auth.model';

@Module({
  controllers: [AuthController],
  providers: [ConfigService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: AuthModel,
        schemaOptions: {
          collection: 'User',
        },
      },
    ]),
  ],
})
export class AuthModule {}
