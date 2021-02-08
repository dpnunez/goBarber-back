import { Router } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../models';
import { CreateUserService } from '../services';

const usersRouter = Router();

usersRouter.get('/', async (_, res) => {
  const usersRepository = getRepository(User);
  const users = await usersRepository.find();

  return res.json(users);
});

usersRouter.post('/', async (req, res) => {
  try {
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
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default usersRouter;
