import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';

import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FilesElementResponse } from 'src/files/dto/files-element.response';
import { FilesService } from 'src/files/files.service';
import { MFile } from 'src/files/mfile.class';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @HttpCode(200)
  @UsePipes(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('file'))
  async upload(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<FilesElementResponse[]> {
    const file = files[0];

    const saveArray: MFile[] = [new MFile(file)];

    if (file.mimetype.includes('image')) {
      const buffer = await this.filesService.convertToWebp(file.buffer);
      const filename = file.originalname.replace(' ', '_');
      saveArray.push({
        originalname: `${filename.split('.')[0]}.webp`,
        buffer,
      });
    }
    return await this.filesService.saveFiles(saveArray);
  }
}
