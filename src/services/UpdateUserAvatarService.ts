import { getRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';
import uploadConfig from '../config/upload';

import { User } from '../models';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new Error('Only auth. user can change avatar');
    }

    if (user.avatar) {
      const userAvatarPath = path.join(uploadConfig.storagePath, user.avatar);

      try {
        await fs.promises.stat(userAvatarPath);
        await fs.promises.unlink(userAvatarPath);
      } catch (err) {
        console.log(err);
      }
    }

    user.avatar = avatarFilename;
    await userRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
