import path from 'path';
import crypto from 'crypto';
import multer from 'multer';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

const storageTypes = {
  local: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      file.key = `${fileHash}-${file.originalname}`;

      return callback(null, file.key);
    },
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: 'recipes-share',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (request, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

export default {
  directory: tmpFolder,
  storage: storageTypes[process.env.STORAGE_TYPE],
};
