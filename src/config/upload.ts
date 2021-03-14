import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const storagePath = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  storagePath,
  storage: multer.diskStorage({
    destination: storagePath,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
