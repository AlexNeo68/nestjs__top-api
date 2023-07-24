import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { format } from 'date-fns';
import { ensureDir, writeFile } from 'fs-extra';
import { FilesElementResponse } from 'src/files/dto/files-element.response';
import * as sharp from 'sharp';
import { MFile } from 'src/files/mfile.class';
@Injectable()
export class FilesService {
  async saveFiles(files: MFile[]): Promise<FilesElementResponse[]> {
    console.log(files);

    const dateFolder = format(new Date(), 'yyyy-MM-dd');
    const uploadFolder = `${path}/uploads/${dateFolder}`;
    await ensureDir(uploadFolder);
    const res: FilesElementResponse[] = [];
    for (const file of files) {
      const filename = file.originalname.replace(' ', '_');
      await writeFile(`${uploadFolder}/${filename}`, file.buffer);
      res.push({
        url: `/public/${dateFolder}/${filename}`,
        name: filename,
      });
    }
    return res;
  }

  async convertToWebp(file: Buffer): Promise<Buffer> {
    return sharp(file).webp().toBuffer();
  }
}
