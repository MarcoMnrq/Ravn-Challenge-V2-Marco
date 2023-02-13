import { Injectable } from '@nestjs/common';
import AWS from 'aws-sdk';

const S3_CONFIG: AWS.S3.Types.ClientConfiguration = {
  apiVersion: '2010-12-01',
  region: 'eu-central-1',
};

@Injectable()
export class AwsS3Service {
  private readonly s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3(S3_CONFIG);
  }

  /**
   * It takes a file, uploads it to the images/ folder, and returns the URL of the uploaded file
   * @param file - Express.Multer.File - This is the file that was uploaded.
   * @returns The file name of the uploaded file.
   */
  async uploadImage(file: Express.Multer.File): Promise<string> {
    return this.uploadFile(file, 'images/');
  }

  /**
   * It uploads a file to S3 and returns the key of the uploaded file
   * @param file - Express.Multer.File - The file object that multer created.
   * @param {string} prefix - This is the prefix of the file name. For example, if you want to upload a
   * file to the folder "images", you would pass in "images/".
   * @returns The key of the file that was uploaded.
   */
  private async uploadFile(
    file: Express.Multer.File,
    prefix: string,
  ): Promise<string> {
    const originalFileName = file.filename;
    const uniqueFileName = `${Date.now()}-${originalFileName}`;
    const key = prefix + uniqueFileName;
    await this.s3
      .putObject({
        Bucket: 'example_bucket',
        Body: file.buffer,
        ACL: 'public-read',
        Key: key,
      })
      .promise();

    return key;
  }
}
