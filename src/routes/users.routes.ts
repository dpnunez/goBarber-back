import { Router } from 'express';
import { CreateUserService } from '../services';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return user;
    return res.send();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default usersRouter;
