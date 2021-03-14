import { Router } from 'express';

import { AuthenticationService } from '../services';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authenticationService = new AuthenticationService();
  const {
    token,
    user: { password: _, ...user },
  } = await authenticationService.execute({
    email,
    password,
  });

  return res.json({ user, token });
});

export default sessionsRouter;
