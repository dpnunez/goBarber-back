import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '../config/upload';

import { User } from '../models';
import { CreateUserService, UpdateUserAvatarService } from '../services';

import { ensureAuthenticated } from '../middlewares';

const usersRouter = Router();
const upload = multer(uploadConfig);

// index
usersRouter.get('/', ensureAuthenticated, async (_, res) => {
  const usersRepository = getRepository(User);
  const users = await usersRepository.find();

  return res.json(users);
});

// signup
usersRouter.post('/', async (req, res) => {
  const { email, password, name } = req.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  const userWithoutPassword = {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return res.json(userWithoutPassword);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const { id: user_id } = req.user;
    const { filename: avatarFilename } = req.file;

    const updateUserAvatarService = new UpdateUserAvatarService();
    const user = await updateUserAvatarService.execute({
      user_id,
      avatarFilename,
    });

    return res.json(user);
  },
);

export default usersRouter;
