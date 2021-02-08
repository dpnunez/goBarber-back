import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import { User } from '../models';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const isUsedEmail = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (isUsedEmail) {
      throw new Error('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
