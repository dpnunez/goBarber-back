import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import { User } from '../models';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
}

class AuthenticationService {
  public async execute({ password, email }: Request): Promise<Response> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    const isCorrectPassword = await compare(password, user.password);

    if (!isCorrectPassword) {
      throw new Error('Incorrect email/password combination.');
    }

    return { user };
  }
}

export default AuthenticationService;
