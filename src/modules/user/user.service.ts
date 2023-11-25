import { IUser, IUserOrders } from './user.interface';
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

const deleteUserFromDB = async (userId: number) => {
  const userExists = await userModel.isUserExists(userId);
  if (userExists) {
    const result = await userModel.deleteOne({ userId });
    return result;
  } else {
    throw new Error(`User not found`);
  }
};

const createOrderForUserInDB = async (
  userId: number,
  orderData: IUserOrders | undefined,
) => {
  const userExists = await userModel.isUserExists(userId);
  if (userExists) {
    const result = await userModel.findOneAndUpdate(
      { userId },
      { $push: { orders: { $each: [orderData] } } },
    );
    return result;
  } else {
    throw new Error(`User not found`);
  }
};

const getAllOrdersServiceFromDB = async (userId: number) => {
  const userExists = userModel.isUserExists(userId);
  if (await userExists) {
    const result = userModel.findOne({ userId }).select({ orders: 1 });
    return result;
  } else {
    throw new Error(`User not found`);
  }
};

const userOrdersTotalPriceFromDB = async (userId: number) => {
  const userExists = await userModel.isUserExists(userId);

  if (userExists) {
    const result = await userModel.aggregate([
      { $match: { userId } },
      {
        $project: {
          total: {
            $sum: {
              $map: {
                input: '$orders',
                as: 'order',
                in: { $multiply: ['$$order.price', '$$order.quantity'] },
              },
            },
          },
        },
      },
    ]);
    return result.length > 0 ? result[0].total : 0;
  } else {
    throw new Error(`User not found`);
  }
};

export const userService = {
  createUserInDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteUserFromDB,
  createOrderForUserInDB,
  getAllOrdersServiceFromDB,
  userOrdersTotalPriceFromDB,
};
