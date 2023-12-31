/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { ordersZodValidation, userZodValidation } from './user.zod.validation';
import { userService } from './user.service';

const createUserController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const validatedResult = userZodValidation.parse(data);
    const result = await userService.createUserInDB(validatedResult);

    // delete withoutPass.password;
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'User creation failed',
      error: {
        code: 404,
        description: error?.issue ? error?.issues[0].message : error?.message,
      },
    });
  }
};

const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Users fetched failed',
      error: {
        code: 400,
        description: error?.issue ? error?.issues[0].message : error?.message,
      },
    });
  }
};

const getSingleUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await userService.getSingleUserFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'User fetching failed',
      error: {
        code: 404,
        description: error?.issue ? error?.issues[0].message : error?.message,
      },
    });
  }
};

const updateSingleUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const { body } = req;

    const result = await userService.updateSingleUserFromDB(
      Number(userId),
      body,
    );
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'This users update failed',
      error: {
        code: 400,
        description: error?.issue ? error?.issues[0].message : error?.message,
      },
    });
  }
};

const deleteSingleUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    await userService.deleteUserFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User delete failed',
      error: {
        code: 404,
        descripton: error?.issues ? error?.issues[0].message : error?.message,
      },
    });
  }
};

const putOrderForUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { body } = req;
    const validatedResult = ordersZodValidation.parse(body);

    await userService.createOrderForUserInDB(Number(userId), validatedResult);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'Order creation failed',
      error: {
        code: 404,
        descripton: error?.issues ? error?.issues[0].message : error?.message,
      },
    });
  }
};

const getAllOrdersForSpecificUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.getAllOrdersServiceFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'Orders fatched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'Orders failed to be fetched',
      error: {
        code: 404,
        descripton: error?.issues ? error?.issues[0].message : error?.message,
      },
    });
  }
};

const userOrdersTotalPriceController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.userOrdersTotalPriceFromDB(Number(userId));
    
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'Price calculation failed',
      error: {
        code: 404,
        descripton: error?.issues ? error?.issues[0].message : error?.message,
      },
    });
  }
};

export const userController = {
  createUserController,
  getAllUsersController,
  getSingleUserController,
  updateSingleUserController,
  deleteSingleUserController,
  putOrderForUserController,
  getAllOrdersForSpecificUser,
  userOrdersTotalPriceController,
};
