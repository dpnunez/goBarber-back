interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<void> {
    console.log(user_id, avatarFilename);
  }
}

export default UpdateUserAvatarService;
