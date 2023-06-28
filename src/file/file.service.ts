import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';

@Injectable()
export class FileService {
  async upload(path: string, file: Express.Multer.File) {
    await writeFile(path, file.buffer);
  }
}
