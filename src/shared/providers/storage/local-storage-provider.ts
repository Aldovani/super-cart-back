import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload-ts';
import { createWriteStream, promises } from 'node:fs';
import { join, resolve } from 'node:path';

@Injectable()
export class LocalStorageProvider {
  async delete(fileName: string) {
    const file = resolve(join(process.cwd(), `./src/upload/${fileName}`));
    try {
      await promises.stat(file);
    } catch {
      return;
    }

    await promises.unlink(file);
  }

  async save(file: FileUpload) {
    const { filename, createReadStream } = file;

    // const newFileName = `${randomUUID()}${filename}`;

    return new Promise<string>(async (resolve) => {
      createReadStream()
        .pipe(
          createWriteStream(join(process.cwd(), `./src/upload/${filename}`)),
        )
        .on('finish', () => resolve(filename))
        .on('error', () => {
          throw Error('Could not save image');
        });
    });
  }
}
