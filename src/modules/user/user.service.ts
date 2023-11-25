import { IUser } from './user.interface';
import { userModel } from './user.model';

const createUserInDB = async (user: IUser) => {
  const result = await userModel.create(user);
  return result;
};

const getAllUsers = async () => {
  const result = await userModel
    .find()
    .select('username fullName age email address');
  return result;
};

export const userService = {
  createUserInDB,
  getAllUsers,
};
