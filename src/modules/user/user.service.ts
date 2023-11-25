import { IUser } from './user.interface';
import { userModel } from './user.model';

const createUserInDB = async (user: IUser) => {
  const result = await userModel.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await userModel
    .find()
    .select('username fullName age email address');
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const userExists = await userModel.isUserExists(userId);

  if (userExists) {
    const result = await userModel.findOne({ userId });
    return result;
  } else {
    throw new Error(`User not found`);
  }
};

const updateSingleUserFromDB = async (userId: number, data: IUser) => {
  const userExists = await userModel.isUserExists(userId);

  if (userExists) {
    const result = await userModel.findOneAndUpdate({ userId }, data);
    return result;
  } else {
    throw new Error(`User not found`);
  }
};

export const userService = {
  createUserInDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
};
