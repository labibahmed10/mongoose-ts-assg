import { IUser } from './user.interface';
import { userModel } from './user.model';

const createUserInDB = async (user: IUser) => {
  const result = await userModel.create(user);
  return result;
};

export const userService = {
  createUserInDB,
};
