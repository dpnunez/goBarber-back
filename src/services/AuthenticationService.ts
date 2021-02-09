import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { User } from '../models';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
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

    const token = sign({}, '9ad7605646bf5c8569aba9d5840c78be', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}

export default AuthenticationService;
