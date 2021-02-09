import { Router } from 'express';

import { AuthenticationService } from '../services';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
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
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
